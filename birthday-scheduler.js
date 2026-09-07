const { pool } = require('./database');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');
const { getBirthdayTemplate } = require('./birthday-templates');

// Check for birthdays and send greetings (multi-server support)
async function checkAndSendBirthdayGreetings(client) {
  try {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    // Check for birthdays today (all guilds)
    const result = await pool.query(`
      SELECT * FROM birthdays
      WHERE month = $1
      AND day = $2
      AND enabled = true
      AND guild_id IS NOT NULL
    `, [currentMonth, currentDay]);

    for (const birthday of result.rows) {
      try {
        // Get channel (use configured channel or find a general channel)
        let channel;
        if (birthday.channel_id) {
          channel = await client.channels.fetch(birthday.channel_id);
        } else {
          // Try to find a general channel
          const guild = await client.guilds.fetch(birthday.guild_id);
          channel = guild.channels.cache.find(c =>
            c.name === 'general' || c.name === 'chat' || c.type === 0
          );
        }

        if (!channel) {
          console.log(`❌ No suitable channel found for birthday in guild ${birthday.guild_id}`);
          continue;
        }

        // Get user
        const user = await client.users.fetch(birthday.user_id);
        if (!user) continue;

        // Get birthday message template
        const template = getBirthdayTemplate(birthday.language);
        const birthdayMessage = birthday.custom_message || template.defaultMessage;

        // Get birthday GIF from Giphy
        const gifUrl = await getBirthdayGif(template.gifKeyword);

        // Create embed
        const embed = new EmbedBuilder()
          .setTitle(`🎉 ${user.username} Happy Birthday! 🎂`)
          .setDescription(birthdayMessage)
          .setColor(0xFF6B9D)
          .setThumbnail(user.displayAvatarURL())
          .setImage(gifUrl)
          .setFooter({ text: 'Powered by GIPHY' })
          .setTimestamp();

        await channel.send({
          content: `🎊 <@${birthday.user_id}>`,
          embeds: [embed]
        });

        console.log(`✅ Sent birthday greeting for ${user.username} in guild ${birthday.guild_id}`);
      } catch (error) {
        console.error(`❌ Error sending birthday greeting for user ${birthday.user_id}:`, error);
      }
    }
  } catch (error) {
    console.error('❌ Error checking birthdays:', error);
  }
}

// Get birthday GIF from Giphy
async function getBirthdayGif(keyword) {
  try {
    const response = await axios.get('https://api.giphy.com/v1/gifs/random', {
      params: {
        api_key: process.env.GIPHY_API_KEY,
        tag: keyword,
        rating: 'g'
      }
    });

    if (response.data && response.data.data && response.data.data.images) {
      return response.data.data.images.original.url;
    }

    return null;
  } catch (error) {
    console.error('Error fetching Giphy GIF:', error);
    return null;
  }
}

// Add birthday
async function addBirthday(guildId, userId, username, month, day, customMessage, language, channelId) {
  try {
    // Validate month and day
    if (month < 1 || month > 12) {
      return { success: false, message: '❌ Invalid month! Must be 1-12' };
    }

    if (day < 1 || day > 31) {
      return { success: false, message: '❌ Invalid day! Must be 1-31' };
    }

    // Check if birthday already exists
    const existingCheck = await pool.query(
      'SELECT month, day FROM birthdays WHERE guild_id = $1 AND user_id = $2',
      [guildId, userId]
    );

    const isUpdate = existingCheck.rows.length > 0;
    let oldBirthday = '';
    if (isUpdate) {
      const old = existingCheck.rows[0];
      oldBirthday = `\n⚠️ Previous birthday (${old.month}/${old.day}) has been overwritten`;
    }

    await pool.query(`
      INSERT INTO birthdays (guild_id, user_id, username, month, day, custom_message, language, channel_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (guild_id, user_id)
      DO UPDATE SET
        username = EXCLUDED.username,
        month = EXCLUDED.month,
        day = EXCLUDED.day,
        custom_message = EXCLUDED.custom_message,
        language = EXCLUDED.language,
        channel_id = EXCLUDED.channel_id
    `, [guildId, userId, username, month, day, customMessage, language, channelId]);

    const channelText = channelId ? ` to <#${channelId}>` : ' (will use default channel)';
    const actionText = isUpdate ? 'updated' : 'set';
    return {
      success: true,
      message: `✅ Birthday for **${username}** ${actionText} to **${month}/${day}**${channelText}${oldBirthday}\n\n💡 Tip: Use \`/birthday info user:@${username}\` to view all details`
    };
  } catch (error) {
    console.error('Error adding birthday:', error);
    return { success: false, message: '❌ Database error occurred' };
  }
}

// List all birthdays for a specific guild
async function listBirthdays(guildId) {
  try {
    const result = await pool.query(`
      SELECT * FROM birthdays
      WHERE guild_id = $1
      ORDER BY month, day
    `, [guildId]);

    if (result.rows.length === 0) {
      return {
        type: 'text',
        content: '📅 No birthdays configured for this server\n\n💡 Use `/birthday add` to add birthdays!'
      };
    }

    const embed = new EmbedBuilder()
      .setTitle('🎂 Server Birthdays')
      .setColor(0xFF6B9D)
      .setFooter({ text: `Total: ${result.rows.length} birthdays` })
      .setTimestamp();

    // Group by month
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];

    const birthdaysByMonth = {};
    for (const birthday of result.rows) {
      const monthKey = birthday.month;
      if (!birthdaysByMonth[monthKey]) {
        birthdaysByMonth[monthKey] = [];
      }
      birthdaysByMonth[monthKey].push(birthday);
    }

    // Add fields for each month
    for (const [month, birthdays] of Object.entries(birthdaysByMonth)) {
      let monthText = '';
      for (const birthday of birthdays) {
        const status = birthday.enabled ? '' : '❌ ';
        const channelText = birthday.channel_id ? ` → <#${birthday.channel_id}>` : '';
        monthText += `${status}<@${birthday.user_id}> - ${month}/${birthday.day}${channelText}\n`;
      }
      embed.addFields({ name: `📅 ${monthNames[month - 1]}`, value: monthText.trim() || 'None', inline: false });
    }

    // Add upcoming birthday info
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    const upcoming = result.rows.find(b => {
      if (b.month > currentMonth) return true;
      if (b.month === currentMonth && b.day > currentDay) return true;
      return false;
    });

    if (upcoming) {
      const daysUntil = calculateDaysUntil(currentMonth, currentDay, upcoming.month, upcoming.day);
      embed.setDescription(`🎈 Next birthday: <@${upcoming.user_id}> in ${daysUntil} days (${upcoming.month}/${upcoming.day})`);
    }

    return { type: 'embed', embed };
  } catch (error) {
    console.error('Error listing birthdays:', error);
    return { type: 'text', content: '❌ Database error occurred' };
  }
}

// Calculate days until birthday
function calculateDaysUntil(currentMonth, currentDay, birthdayMonth, birthdayDay) {
  const now = new Date();
  const currentYear = now.getFullYear();

  let birthdayThisYear = new Date(currentYear, birthdayMonth - 1, birthdayDay);
  const today = new Date(currentYear, currentMonth - 1, currentDay);

  if (birthdayThisYear < today) {
    birthdayThisYear = new Date(currentYear + 1, birthdayMonth - 1, birthdayDay);
  }

  const diffTime = birthdayThisYear - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

// Remove birthday
async function removeBirthday(guildId, userId) {
  try {
    const result = await pool.query(
      'DELETE FROM birthdays WHERE guild_id = $1 AND user_id = $2',
      [guildId, userId]
    );

    if (result.rowCount === 0) {
      return { success: false, message: '❌ Birthday not found!' };
    }

    return {
      success: true,
      message: '✅ Birthday removed successfully!'
    };
  } catch (error) {
    console.error('Error removing birthday:', error);
    return { success: false, message: '❌ Database error occurred' };
  }
}

// Test birthday greeting (send immediately)
async function testBirthdayGreeting(client, guildId, userId, channelOverride = null) {
  try {
    const result = await pool.query(
      'SELECT * FROM birthdays WHERE guild_id = $1 AND user_id = $2',
      [guildId, userId]
    );

    if (result.rows.length === 0) {
      return { success: false, message: '❌ Birthday not found!' };
    }

    const birthday = result.rows[0];

    // Get channel
    let channel;
    if (channelOverride) {
      channel = await client.channels.fetch(channelOverride);
    } else if (birthday.channel_id) {
      channel = await client.channels.fetch(birthday.channel_id);
    } else {
      const guild = await client.guilds.fetch(guildId);
      channel = guild.channels.cache.find(c =>
        c.name === 'general' || c.name === 'chat' || c.type === 0
      );
    }

    if (!channel) {
      return { success: false, message: '❌ Channel not found!' };
    }

    // Get user
    const user = await client.users.fetch(userId);
    if (!user) {
      return { success: false, message: '❌ User not found!' };
    }

    // Get birthday message template
    const template = getBirthdayTemplate(birthday.language);
    const birthdayMessage = birthday.custom_message || template.defaultMessage;

    // Get birthday GIF from Giphy
    const gifUrl = await getBirthdayGif(template.gifKeyword);

    // Create embed
    const embed = new EmbedBuilder()
      .setTitle(`🎉 ${user.username} Happy Birthday! 🎂 (TEST)`)
      .setDescription(birthdayMessage)
      .setColor(0xFF6B9D)
      .setThumbnail(user.displayAvatarURL())
      .setImage(gifUrl)
      .setFooter({ text: 'Powered by GIPHY | This is a test message' })
      .setTimestamp();

    await channel.send({
      content: `🎊 <@${userId}>`,
      embeds: [embed]
    });

    return {
      success: true,
      message: `✅ Test birthday greeting sent for **${user.username}** to <#${channel.id}>!`
    };
  } catch (error) {
    console.error('Error testing birthday greeting:', error);
    return { success: false, message: '❌ Error sending test greeting' };
  }
}

// Get upcoming birthdays
async function getUpcomingBirthdays(guildId, days = 7) {
  try {
    const result = await pool.query(`
      SELECT * FROM birthdays
      WHERE guild_id = $1
      AND enabled = true
      ORDER BY month, day
    `, [guildId]);

    if (result.rows.length === 0) {
      return {
        type: 'text',
        content: '📅 No birthdays configured for this server'
      };
    }

    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    const upcoming = [];
    for (const birthday of result.rows) {
      const daysUntil = calculateDaysUntil(currentMonth, currentDay, birthday.month, birthday.day);
      if (daysUntil >= 0 && daysUntil <= days) {
        upcoming.push({ ...birthday, daysUntil });
      }
    }

    if (upcoming.length === 0) {
      return {
        type: 'text',
        content: `📅 No birthdays in the next ${days} days`
      };
    }

    const embed = new EmbedBuilder()
      .setTitle(`🎂 Upcoming Birthdays (Next ${days} days)`)
      .setColor(0xFF6B9D)
      .setFooter({ text: `${upcoming.length} upcoming birthdays` })
      .setTimestamp();

    let description = '';
    for (const birthday of upcoming.sort((a, b) => a.daysUntil - b.daysUntil)) {
      const dayText = birthday.daysUntil === 0 ? '**Today!**' :
                      birthday.daysUntil === 1 ? '**Tomorrow**' :
                      `In ${birthday.daysUntil} days`;
      description += `🎈 ${dayText}: <@${birthday.user_id}> (${birthday.month}/${birthday.day})\n`;
    }

    embed.setDescription(description.trim());

    return { type: 'embed', embed };
  } catch (error) {
    console.error('Error getting upcoming birthdays:', error);
    return { type: 'text', content: '❌ Database error occurred' };
  }
}

// Get all user IDs with birthdays (for autocomplete)
async function getAllBirthdayUsers(guildId) {
  try {
    const result = await pool.query(
      'SELECT user_id, username FROM birthdays WHERE guild_id = $1 ORDER BY username',
      [guildId]
    );
    return result.rows;
  } catch (error) {
    console.error('Error getting birthday users:', error);
    return [];
  }
}

// Get birthday info for a specific user
async function getBirthdayInfo(guildId, userId) {
  try {
    const result = await pool.query(
      'SELECT * FROM birthdays WHERE guild_id = $1 AND user_id = $2',
      [guildId, userId]
    );

    if (result.rows.length === 0) {
      return {
        type: 'text',
        content: '❌ No birthday found for this user!'
      };
    }

    const birthday = result.rows[0];
    const template = getBirthdayTemplate(birthday.language);

    // Calculate days until birthday
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();
    const daysUntil = calculateDaysUntil(currentMonth, currentDay, birthday.month, birthday.day);

    const languageNames = {
      'zh-TW': '繁體中文 (Traditional Chinese)',
      'en-US': 'English',
      'tl': 'Tagalog',
      'id': 'Indonesian',
      'ko': '한국어 (Korean)',
      'ja': '日本語 (Japanese)',
      'es-ES': 'Español (Spanish)',
      'de': 'Deutsch (German)',
      'th': 'ไทย (Thai)'
    };

    const embed = new EmbedBuilder()
      .setTitle(`🎂 Birthday Information`)
      .setDescription(`<@${birthday.user_id}>`)
      .setColor(0xFF6B9D)
      .addFields(
        { name: '📅 Birthday Date', value: `${birthday.month}/${birthday.day}`, inline: true },
        { name: '⏰ Days Until', value: daysUntil === 0 ? '**Today!**' : `${daysUntil} days`, inline: true },
        { name: '🌍 Language', value: languageNames[birthday.language] || birthday.language, inline: true },
        { name: '📍 Channel', value: birthday.channel_id ? `<#${birthday.channel_id}>` : 'Default channel', inline: false },
        { name: '💬 Custom Message', value: birthday.custom_message || '_Using default template_', inline: false },
        { name: '📝 Default Template Preview', value: template.defaultMessage.substring(0, 200) + '...', inline: false }
      )
      .setFooter({ text: `Status: ${birthday.enabled ? 'Enabled ✅' : 'Disabled ❌'}` })
      .setTimestamp();

    return { type: 'embed', embed };
  } catch (error) {
    console.error('Error getting birthday info:', error);
    return { type: 'text', content: '❌ Database error occurred' };
  }
}

module.exports = {
  checkAndSendBirthdayGreetings,
  addBirthday,
  listBirthdays,
  removeBirthday,
  testBirthdayGreeting,
  getUpcomingBirthdays,
  getAllBirthdayUsers,
  getBirthdayInfo
};
