const { pool } = require('./database');

// Default event categories
const DEFAULT_BEAR_EVENTS = [
  'Bear Trap 1',
  'Bear Trap 2',
  'Academy Bear Trap 1',
  'Academy Bear Trap 2'
];

const DEFAULT_EVENT_NAMES = [
  'Bear Trap 1',
  'Bear Trap 2',
  'Academy Bear Trap 1',
  'Academy Bear Trap 2',
  'Caesar Boss',
  'Viking'
];

// Get custom events for a guild from database
async function getGuildCustomEvents(guildId) {
  const result = await pool.query(
    'SELECT event_name, emoji, type FROM custom_events WHERE guild_id = $1',
    [guildId]
  );

  const customEvents = {};
  result.rows.forEach(row => {
    customEvents[row.event_name] = {
      emoji: row.emoji,
      type: row.type
    };
  });

  return customEvents;
}

// Get all event names for a guild
async function getAllEventNames(guildId) {
  const customEvents = await getGuildCustomEvents(guildId);
  const customEventNames = Object.keys(customEvents);
  return [...DEFAULT_EVENT_NAMES, ...customEventNames];
}

// Get all Bear events for a guild
async function getAllBearEvents(guildId) {
  const customEvents = await getGuildCustomEvents(guildId);
  const customBearEvents = Object.keys(customEvents).filter(
    name => customEvents[name].type === 'recurring'
  );
  return [...DEFAULT_BEAR_EVENTS, ...customBearEvents];
}

// Check if event is a Bear event
async function isBearEvent(eventName, guildId) {
  const bearEvents = await getAllBearEvents(guildId);
  return bearEvents.includes(eventName);
}

// Get event emoji
async function getEventEmoji(eventName, guildId) {
  const customEvents = await getGuildCustomEvents(guildId);
  if (customEvents[eventName]) {
    return customEvents[eventName].emoji || '⚔️';
  }
  return '⚔️';
}

// Add custom event
async function addCustomEvent(eventName, emoji, type, guildId) {
  try {
    const allEvents = await getAllEventNames(guildId);
    if (allEvents.includes(eventName)) {
      return { success: false, message: `❌ Event **${eventName}** already exists!` };
    }

    if (type !== 'recurring' && type !== 'single') {
      return { success: false, message: '❌ Invalid event type! Must be "recurring" or "single"' };
    }

    await pool.query(
      'INSERT INTO custom_events (guild_id, event_name, emoji, type) VALUES ($1, $2, $3, $4)',
      [guildId, eventName, emoji, type]
    );

    const typeText = type === 'recurring' ? 'Recurring (every 48 hours)' : 'One-time';
    return {
      success: true,
      message: `✅ Custom event **${eventName}** ${emoji} added successfully!\nType: ${typeText}`
    };
  } catch (error) {
    console.error('Error adding custom event:', error);
    return { success: false, message: '❌ Database error occurred' };
  }
}

// Remove custom event
async function removeCustomEvent(eventName, guildId) {
  try {
    const customEvents = await getGuildCustomEvents(guildId);

    if (!customEvents[eventName]) {
      return { success: false, message: `❌ Custom event **${eventName}** not found!` };
    }

    // Check if event has active schedule
    const scheduleResult = await pool.query(
      'SELECT 1 FROM schedules WHERE guild_id = $1 AND event_name = $2',
      [guildId, eventName]
    );

    if (scheduleResult.rows.length > 0) {
      return {
        success: false,
        message: `❌ Cannot remove **${eventName}** - it has an active schedule!\nPlease stop the schedule first using /stop`
      };
    }

    await pool.query(
      'DELETE FROM custom_events WHERE guild_id = $1 AND event_name = $2',
      [guildId, eventName]
    );

    return {
      success: true,
      message: `✅ Custom event **${eventName}** removed successfully!`
    };
  } catch (error) {
    console.error('Error removing custom event:', error);
    return { success: false, message: '❌ Database error occurred' };
  }
}

// Format UTC time string
function formatUTCTime(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// Convert date to Discord timestamp
function toDiscordTimestamp(date, style = 'F') {
  const unixTimestamp = Math.floor(date.getTime() / 1000);
  return `<t:${unixTimestamp}:${style}>`;
}

// Schedule an event
async function scheduleEvent(eventName, timeString, channelId, guildId, userId, discordLocale) {
  try {
    const allEventNames = await getAllEventNames(guildId);
    if (!allEventNames.includes(eventName)) {
      return { success: false, message: '❌ Invalid event name!' };
    }

    const timeMatch = timeString.match(/^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})$/);
    if (!timeMatch) {
      return { success: false, message: '❌ Invalid time format! Please use: YYYY-MM-DD HH:MM' };
    }

    const [, year, month, day, hour, minute] = timeMatch;
    const eventTime = new Date(Date.UTC(year, month - 1, day, hour, minute));

    if (eventTime <= new Date()) {
      return { success: false, message: '❌ Cannot schedule events in the past!' };
    }

    const isRecurring = await isBearEvent(eventName, guildId);
    const { getUserLanguage } = require('./user-preferences-db');
    const userLanguage = await getUserLanguage(guildId, userId, discordLocale);

    // Upsert schedule
    await pool.query(`
      INSERT INTO schedules (guild_id, event_name, event_time, channel_id, type, created_by, language)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (guild_id, event_name)
      DO UPDATE SET
        event_time = EXCLUDED.event_time,
        channel_id = EXCLUDED.channel_id,
        type = EXCLUDED.type,
        created_by = EXCLUDED.created_by,
        language = EXCLUDED.language,
        last_notified = NULL
    `, [guildId, eventName, eventTime, channelId, isRecurring ? 'recurring' : 'single', userId, userLanguage]);

    const eventType = isRecurring ? '(Recurring, every 48 hours)' : '(One-time)';
    return {
      success: true,
      message: `✅ **${eventName}** ${eventType} scheduled at **${timeString} UTC**\n⏰ Notification will be sent 5 minutes before the event starts`
    };
  } catch (error) {
    console.error('Error scheduling event:', error);
    return { success: false, message: '❌ Database error occurred' };
  }
}

// List all scheduled events
async function listScheduledEvents(guildId) {
  try {
    const result = await pool.query(
      'SELECT event_name, event_time, type FROM schedules WHERE guild_id = $1 ORDER BY event_time',
      [guildId]
    );

    if (result.rows.length === 0) {
      return '📋 No scheduled events';
    }

    let message = '📋 **Scheduled Events:**\n\n';
    const now = new Date();

    for (const row of result.rows) {
      const eventTime = new Date(row.event_time);
      const notificationTime = new Date(eventTime.getTime() - 5 * 60 * 1000);

      const utcTime = formatUTCTime(eventTime);
      const discordTimestamp = toDiscordTimestamp(eventTime, 'F');
      const notifDiscordTimestamp = toDiscordTimestamp(notificationTime, 't');

      const emoji = await getEventEmoji(row.event_name, guildId);
      const typeIcon = row.type === 'recurring' ? '🔄' : '📅';
      const status = now >= notificationTime ? '⏳ Sending soon' : '⏰ Scheduled';

      message += `${emoji} **${row.event_name}** ${typeIcon}\n`;
      message += `   • Event Time: ${discordTimestamp}\n`;
      message += `   • UTC Input: ${utcTime}\n`;
      message += `   • Notification: 5 minutes before (${notifDiscordTimestamp})\n`;
      message += `   • Status: ${status}\n\n`;
    }

    return message.trim();
  } catch (error) {
    console.error('Error listing events:', error);
    return '❌ Database error occurred';
  }
}

// Stop an event or all events
async function stopEvent(eventName, guildId) {
  try {
    if (eventName === 'All') {
      const result = await pool.query('DELETE FROM schedules WHERE guild_id = $1', [guildId]);
      return { success: true, message: `✅ Cleared all schedules (${result.rowCount} events removed)` };
    }

    const result = await pool.query(
      'DELETE FROM schedules WHERE guild_id = $1 AND event_name = $2',
      [guildId, eventName]
    );

    if (result.rowCount === 0) {
      return { success: false, message: `❌ **${eventName}** is not currently scheduled` };
    }

    return { success: true, message: `✅ Stopped schedule for **${eventName}**` };
  } catch (error) {
    console.error('Error stopping event:', error);
    return { success: false, message: '❌ Database error occurred' };
  }
}

// Check and send notifications
async function checkAndSendNotifications(client) {
  try {
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
    const sixMinutesAgo = new Date(now.getTime() - 6 * 60 * 1000);

    // Find schedules that need notification
    const result = await pool.query(`
      SELECT * FROM schedules
      WHERE event_time BETWEEN $1 AND $2
      AND (last_notified IS NULL OR last_notified != event_time)
    `, [sixMinutesAgo, fiveMinutesAgo]);

    for (const schedule of result.rows) {
      try {
        const channel = await client.channels.fetch(schedule.channel_id);
        if (!channel) continue;

        const eventTime = new Date(schedule.event_time);
        const emoji = await getEventEmoji(schedule.event_name, schedule.guild_id);
        const discordTimestamp = toDiscordTimestamp(eventTime, 'F');
        const utcTimeString = formatUTCTime(eventTime);

        // Get current language for the user
        const { getUserLanguage } = require('./user-preferences-db');
        const { getTranslation } = require('./i18n');
        const language = schedule.created_by
          ? await getUserLanguage(schedule.guild_id, schedule.created_by, 'en-US')
          : (schedule.language || 'en-US');

        const title = getTranslation(language, 'notification.title');
        const startTimeLabel = getTranslation(language, 'notification.startTime');
        const utcTimeLabel = getTranslation(language, 'notification.utcTime');
        const localTimeLabel = getTranslation(language, 'notification.localTime');
        const footer = getTranslation(language, 'notification.footer');

        const message = `🚨 @everyone\n\n${emoji} **${schedule.event_name}** ${title}\n\n${startTimeLabel}:\n   • ${utcTimeLabel}: ${utcTimeString}\n   • ${localTimeLabel}: ${discordTimestamp}\n\n${footer}`;

        await channel.send(message);
        console.log(`✅ Sent notification for ${schedule.event_name} in guild ${schedule.guild_id} (${language})`);

        // Update or delete schedule
        if (schedule.type === 'recurring') {
          const nextEventTime = new Date(eventTime.getTime() + 48 * 60 * 60 * 1000);
          await pool.query(
            'UPDATE schedules SET event_time = $1, last_notified = NULL WHERE id = $2',
            [nextEventTime, schedule.id]
          );
          console.log(`🔄 ${schedule.event_name} rescheduled to ${nextEventTime.toISOString()}`);
        } else {
          await pool.query('DELETE FROM schedules WHERE id = $1', [schedule.id]);
          console.log(`🗑️ ${schedule.event_name} removed (single event completed)`);
        }
      } catch (error) {
        console.error(`❌ Error sending notification for ${schedule.event_name}:`, error);
      }
    }
  } catch (error) {
    console.error('❌ Error checking notifications:', error);
  }
}

module.exports = {
  scheduleEvent,
  listScheduledEvents,
  stopEvent,
  checkAndSendNotifications,
  addCustomEvent,
  removeCustomEvent,
  getAllEventNames,
  getGuildCustomEvents
};
