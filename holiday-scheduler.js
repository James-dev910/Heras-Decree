const { pool } = require('./database');
const { Lunar, Solar } = require('lunar-javascript');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

// Check for holidays and send greetings
async function checkAndSendHolidayGreetings(client) {
  try {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    // Get lunar date
    const solar = Solar.fromDate(today);
    const lunar = solar.getLunar();
    const lunarMonth = lunar.getMonth();
    const lunarDay = lunar.getDay();

    // Check solar calendar holidays
    const solarResult = await pool.query(`
      SELECT * FROM holidays
      WHERE calendar_type = 'solar'
      AND month = $1
      AND day = $2
      AND enabled = true
    `, [currentMonth, currentDay]);

    // Check lunar calendar holidays
    const lunarResult = await pool.query(`
      SELECT * FROM holidays
      WHERE calendar_type = 'lunar'
      AND month = $1
      AND day = $2
      AND enabled = true
    `, [lunarMonth, lunarDay]);

    const allHolidays = [...solarResult.rows, ...lunarResult.rows];

    for (const holiday of allHolidays) {
      try {
        const channel = await client.channels.fetch(holiday.channel_id);
        if (!channel) continue;

        // Get holiday GIF from Giphy
        const gifUrl = await getHolidayGif(holiday.gif_keyword);

        // Create embed
        const embed = new EmbedBuilder()
          .setTitle(`🎉 ${holiday.name}`)
          .setDescription(holiday.greeting_message)
          .setColor(0xFF6B9D)
          .setImage(gifUrl)
          .setFooter({ text: 'Powered by GIPHY' })
          .setTimestamp();

        await channel.send({ embeds: [embed] });

        console.log(`✅ Sent holiday greeting for ${holiday.name} in channel ${holiday.channel_id}`);
      } catch (error) {
        console.error(`❌ Error sending holiday greeting for ${holiday.name}:`, error);
      }
    }
  } catch (error) {
    console.error('❌ Error checking holidays:', error);
  }
}

// Get holiday GIF from Giphy
async function getHolidayGif(keyword) {
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

// Add holiday
async function addHoliday(name, calendarType, month, day, language, channelId, greetingMessage, gifKeyword) {
  try {
    // Validate calendar type
    if (calendarType !== 'solar' && calendarType !== 'lunar') {
      return { success: false, message: '❌ Invalid calendar type! Must be "solar" or "lunar"' };
    }

    // Validate month and day
    if (month < 1 || month > 12) {
      return { success: false, message: '❌ Invalid month! Must be 1-12' };
    }

    if (day < 1 || day > 31) {
      return { success: false, message: '❌ Invalid day! Must be 1-31' };
    }

    await pool.query(`
      INSERT INTO holidays (name, calendar_type, month, day, language, channel_id, greeting_message, gif_keyword)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (name, language)
      DO UPDATE SET
        calendar_type = EXCLUDED.calendar_type,
        month = EXCLUDED.month,
        day = EXCLUDED.day,
        channel_id = EXCLUDED.channel_id,
        greeting_message = EXCLUDED.greeting_message,
        gif_keyword = EXCLUDED.gif_keyword
    `, [name, calendarType, month, day, language, channelId, greetingMessage, gifKeyword]);

    const calendarText = calendarType === 'solar' ? 'Solar Calendar' : 'Lunar Calendar';
    return {
      success: true,
      message: `✅ Holiday **${name}** (${language}) added successfully!\nDate: ${calendarText} ${month}/${day}`
    };
  } catch (error) {
    console.error('Error adding holiday:', error);
    return { success: false, message: '❌ Database error occurred' };
  }
}

// List all holidays
async function listHolidays() {
  try {
    const result = await pool.query(`
      SELECT * FROM holidays
      ORDER BY calendar_type, month, day, language
    `);

    if (result.rows.length === 0) {
      return '📅 No holidays configured';
    }

    let message = '📅 **Configured Holidays:**\n\n';

    // Group by calendar type
    const solarHolidays = result.rows.filter(h => h.calendar_type === 'solar');
    const lunarHolidays = result.rows.filter(h => h.calendar_type === 'lunar');

    if (solarHolidays.length > 0) {
      message += '**☀️ Solar Calendar Holidays:**\n';
      for (const holiday of solarHolidays) {
        const status = holiday.enabled ? '✅' : '❌';
        message += `${status} **${holiday.name}** (${holiday.language})\n`;
        message += `   • Date: ${holiday.month}/${holiday.day}\n`;
        message += `   • Channel: <#${holiday.channel_id}>\n\n`;
      }
    }

    if (lunarHolidays.length > 0) {
      message += '**🌙 Lunar Calendar Holidays:**\n';
      for (const holiday of lunarHolidays) {
        const status = holiday.enabled ? '✅' : '❌';
        message += `${status} **${holiday.name}** (${holiday.language})\n`;
        message += `   • Date: Lunar ${holiday.month}/${holiday.day}\n`;
        message += `   • Channel: <#${holiday.channel_id}>\n\n`;
      }
    }

    return message.trim();
  } catch (error) {
    console.error('Error listing holidays:', error);
    return '❌ Database error occurred';
  }
}

// Delete holiday
async function deleteHoliday(name, language) {
  try {
    const result = await pool.query(
      'DELETE FROM holidays WHERE name = $1 AND language = $2',
      [name, language]
    );

    if (result.rowCount === 0) {
      return { success: false, message: `❌ Holiday **${name}** (${language}) not found!` };
    }

    return {
      success: true,
      message: `✅ Holiday **${name}** (${language}) deleted successfully!`
    };
  } catch (error) {
    console.error('Error deleting holiday:', error);
    return { success: false, message: '❌ Database error occurred' };
  }
}

// Toggle holiday enabled status
async function toggleHoliday(name, language, enabled) {
  try {
    const result = await pool.query(
      'UPDATE holidays SET enabled = $1 WHERE name = $2 AND language = $3',
      [enabled, name, language]
    );

    if (result.rowCount === 0) {
      return { success: false, message: `❌ Holiday **${name}** (${language}) not found!` };
    }

    const status = enabled ? 'enabled' : 'disabled';
    return {
      success: true,
      message: `✅ Holiday **${name}** (${language}) ${status} successfully!`
    };
  } catch (error) {
    console.error('Error toggling holiday:', error);
    return { success: false, message: '❌ Database error occurred' };
  }
}

// Test holiday greeting (send immediately)
async function testHolidayGreeting(client, name, language) {
  try {
    const result = await pool.query(
      'SELECT * FROM holidays WHERE name = $1 AND language = $2',
      [name, language]
    );

    if (result.rows.length === 0) {
      return { success: false, message: `❌ Holiday **${name}** (${language}) not found!` };
    }

    const holiday = result.rows[0];
    const channel = await client.channels.fetch(holiday.channel_id);

    if (!channel) {
      return { success: false, message: `❌ Channel not found!` };
    }

    // Get holiday GIF from Giphy
    const gifUrl = await getHolidayGif(holiday.gif_keyword);

    // Create embed
    const embed = new EmbedBuilder()
      .setTitle(`🎉 ${holiday.name} (TEST)`)
      .setDescription(holiday.greeting_message)
      .setColor(0xFF6B9D)
      .setImage(gifUrl)
      .setFooter({ text: 'Powered by GIPHY | This is a test message' })
      .setTimestamp();

    await channel.send({ embeds: [embed] });

    return {
      success: true,
      message: `✅ Test greeting sent for **${holiday.name}** (${language}) to <#${holiday.channel_id}>!`
    };
  } catch (error) {
    console.error('Error testing holiday greeting:', error);
    return { success: false, message: '❌ Error sending test greeting' };
  }
}

// Get all holiday names for autocomplete
async function getAllHolidayNames() {
  try {
    const result = await pool.query(
      'SELECT DISTINCT name FROM holidays ORDER BY name'
    );
    return result.rows.map(row => row.name);
  } catch (error) {
    console.error('Error getting holiday names:', error);
    return [];
  }
}

// Get languages for a specific holiday
async function getHolidayLanguages(name) {
  try {
    const result = await pool.query(
      'SELECT language FROM holidays WHERE name = $1 ORDER BY language',
      [name]
    );
    return result.rows.map(row => row.language);
  } catch (error) {
    console.error('Error getting holiday languages:', error);
    return [];
  }
}

module.exports = {
  checkAndSendHolidayGreetings,
  addHoliday,
  listHolidays,
  deleteHoliday,
  toggleHoliday,
  testHolidayGreeting,
  getAllHolidayNames,
  getHolidayLanguages
};
