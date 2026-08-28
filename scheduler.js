const fs = require('fs');
const path = require('path');

const SCHEDULER_FILE = path.join(__dirname, 'scheduler-data.json');
const CUSTOM_EVENTS_FILE = path.join(__dirname, 'custom-events.json');

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

// Load custom events from file
function loadCustomEvents() {
  try {
    if (fs.existsSync(CUSTOM_EVENTS_FILE)) {
      const data = fs.readFileSync(CUSTOM_EVENTS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading custom events:', error);
  }
  return {};
}

// Save custom events to file
function saveCustomEvents(customEvents) {
  try {
    fs.writeFileSync(CUSTOM_EVENTS_FILE, JSON.stringify(customEvents, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving custom events:', error);
  }
}

// Get custom events for a specific guild
function getGuildCustomEvents(guildId) {
  const allCustomEvents = loadCustomEvents();
  return allCustomEvents[guildId] || {};
}

// Get all event names for a guild (default + custom)
function getAllEventNames(guildId) {
  const customEvents = getGuildCustomEvents(guildId);
  const customEventNames = Object.keys(customEvents);
  return [...DEFAULT_EVENT_NAMES, ...customEventNames];
}

// Get all Bear events for a guild (default + custom Bear events)
function getAllBearEvents(guildId) {
  const customEvents = getGuildCustomEvents(guildId);
  const customBearEvents = Object.keys(customEvents).filter(name => customEvents[name].type === 'recurring');
  return [...DEFAULT_BEAR_EVENTS, ...customBearEvents];
}

// Check if event is a Bear event
function isBearEvent(eventName, guildId) {
  return getAllBearEvents(guildId).includes(eventName);
}

// Get event emoji
function getEventEmoji(eventName, guildId) {
  const customEvents = getGuildCustomEvents(guildId);
  if (customEvents[eventName]) {
    return customEvents[eventName].emoji || '⚔️';
  }
  return '⚔️'; // Default emoji for built-in events
}

// Load scheduled events from file
function loadSchedules() {
  try {
    if (fs.existsSync(SCHEDULER_FILE)) {
      const data = fs.readFileSync(SCHEDULER_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading schedules:', error);
  }
  return {};
}

// Get schedules for a specific guild
function getGuildSchedules(guildId) {
  const allSchedules = loadSchedules();
  return allSchedules[guildId] || {};
}

// Save schedules for a specific guild
function saveGuildSchedules(guildId, guildSchedules) {
  const allSchedules = loadSchedules();
  allSchedules[guildId] = guildSchedules;
  saveSchedules(allSchedules);
}

// Save scheduled events to file
function saveSchedules(schedules) {
  try {
    fs.writeFileSync(SCHEDULER_FILE, JSON.stringify(schedules, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving schedules:', error);
  }
}

// Add custom event
function addCustomEvent(eventName, emoji, type, guildId) {
  // Validate event name doesn't already exist
  const allEvents = getAllEventNames(guildId);
  if (allEvents.includes(eventName)) {
    return { success: false, message: `❌ Event **${eventName}** already exists!` };
  }

  // Validate type
  if (type !== 'recurring' && type !== 'single') {
    return { success: false, message: '❌ Invalid event type! Must be "recurring" or "single"' };
  }

  const allCustomEvents = loadCustomEvents();
  if (!allCustomEvents[guildId]) {
    allCustomEvents[guildId] = {};
  }

  allCustomEvents[guildId][eventName] = {
    emoji: emoji,
    type: type
  };

  saveCustomEvents(allCustomEvents);

  const typeText = type === 'recurring' ? 'Recurring (every 48 hours)' : 'One-time';
  return {
    success: true,
    message: `✅ Custom event **${eventName}** ${emoji} added successfully!\nType: ${typeText}`
  };
}

// Remove custom event
function removeCustomEvent(eventName, guildId) {
  const customEvents = getGuildCustomEvents(guildId);

  if (!customEvents[eventName]) {
    return { success: false, message: `❌ Custom event **${eventName}** not found!` };
  }

  // Check if event has active schedule
  const guildSchedules = getGuildSchedules(guildId);
  if (guildSchedules[eventName]) {
    return {
      success: false,
      message: `❌ Cannot remove **${eventName}** - it has an active schedule!\nPlease stop the schedule first using /stop`
    };
  }

  const allCustomEvents = loadCustomEvents();
  delete allCustomEvents[guildId][eventName];
  saveCustomEvents(allCustomEvents);

  return {
    success: true,
    message: `✅ Custom event **${eventName}** removed successfully!`
  };
}

// Schedule an event
function scheduleEvent(eventName, timeString, channelId, guildId, userId, discordLocale) {
  const allEventNames = getAllEventNames(guildId);
  if (!allEventNames.includes(eventName)) {
    return { success: false, message: '❌ Invalid event name!' };
  }

  // Parse time (format: YYYY-MM-DD HH:MM)
  const timeMatch = timeString.match(/^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})$/);
  if (!timeMatch) {
    return { success: false, message: '❌ Invalid time format! Please use: YYYY-MM-DD HH:MM' };
  }

  const [, year, month, day, hour, minute] = timeMatch;
  const eventTime = new Date(Date.UTC(year, month - 1, day, hour, minute));

  // Check if time is in the past
  if (eventTime <= new Date()) {
    return { success: false, message: '❌ Cannot schedule events in the past!' };
  }

  const guildSchedules = getGuildSchedules(guildId);
  const isRecurring = isBearEvent(eventName, guildId);

  // Store user info for language preferences
  const { getUserLanguage } = require('./user-preferences');
  const userLanguage = getUserLanguage(guildId, userId, discordLocale);

  guildSchedules[eventName] = {
    time: eventTime.toISOString(),
    channelId: channelId,
    type: isRecurring ? 'recurring' : 'single',
    lastNotified: null,
    createdBy: userId,
    language: userLanguage
  };

  saveGuildSchedules(guildId, guildSchedules);

  const eventType = isRecurring ? '(Recurring, every 48 hours)' : '(One-time)';
  return {
    success: true,
    message: `✅ **${eventName}** ${eventType} scheduled at **${timeString} UTC**\n⏰ Notification will be sent 5 minutes before the event starts`
  };
}

// List all scheduled events
function listScheduledEvents(guildId) {
  const guildSchedules = getGuildSchedules(guildId);
  const events = Object.entries(guildSchedules);

  if (events.length === 0) {
    return '📋 No scheduled events';
  }

  let message = '📋 **Scheduled Events:**\n\n';

  events.forEach(([eventName, data]) => {
    const eventTime = new Date(data.time);
    const now = new Date();
    const notificationTime = new Date(eventTime.getTime() - 5 * 60 * 1000);

    const utcTime = formatUTCTime(eventTime);
    const discordTimestamp = toDiscordTimestamp(eventTime, 'F');
    const notifDiscordTimestamp = toDiscordTimestamp(notificationTime, 't');

    const emoji = getEventEmoji(eventName, guildId);
    const typeIcon = data.type === 'recurring' ? '🔄' : '📅';
    const status = now >= notificationTime ? '⏳ Sending soon' : '⏰ Scheduled';

    message += `${emoji} **${eventName}** ${typeIcon}\n`;
    message += `   • Event Time: ${discordTimestamp}\n`;
    message += `   • UTC Input: ${utcTime}\n`;
    message += `   • Notification: 5 minutes before (${notifDiscordTimestamp})\n`;
    message += `   • Status: ${status}\n\n`;
  });

  return message.trim();
}

// Stop an event or all events
function stopEvent(eventName, guildId) {
  const guildSchedules = getGuildSchedules(guildId);

  if (eventName === 'All') {
    const count = Object.keys(guildSchedules).length;
    saveGuildSchedules(guildId, {});
    return { success: true, message: `✅ Cleared all schedules (${count} events removed)` };
  }

  if (!guildSchedules[eventName]) {
    return { success: false, message: `❌ **${eventName}** is not currently scheduled` };
  }

  delete guildSchedules[eventName];
  saveGuildSchedules(guildId, guildSchedules);
  return { success: true, message: `✅ Stopped schedule for **${eventName}**` };
}

// Format UTC time string for display
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

// Check and send notifications
async function checkAndSendNotifications(client) {
  const allSchedules = loadSchedules();
  const now = new Date();
  let updated = false;

  // Iterate through all guilds
  for (const [guildId, guildSchedules] of Object.entries(allSchedules)) {
    for (const [eventName, data] of Object.entries(guildSchedules)) {
      const eventTime = new Date(data.time);
      const notificationTime = new Date(eventTime.getTime() - 5 * 60 * 1000); // 5 minutes before
      const notificationEndTime = new Date(notificationTime.getTime() + 60 * 1000); // 1-minute window

      // Check if it's time to send notification (within 1-minute window)
      if (now >= notificationTime && now < notificationEndTime) {
        // Check if we already sent notification for this time
        if (data.lastNotified === data.time) {
          continue; // Already sent
        }

        try {
          const channel = await client.channels.fetch(data.channelId);
          if (channel) {
            const emoji = getEventEmoji(eventName, guildId);
            const discordTimestamp = toDiscordTimestamp(eventTime, 'F');
            const utcTimeString = formatUTCTime(eventTime);

            // Get language for this event (use stored language or default to English)
            const { getTranslation } = require('./i18n');
            const language = data.language || 'en-US';

            const title = getTranslation(language, 'notification.title');
            const startTimeLabel = getTranslation(language, 'notification.startTime');
            const utcTimeLabel = getTranslation(language, 'notification.utcTime');
            const localTimeLabel = getTranslation(language, 'notification.localTime');
            const footer = getTranslation(language, 'notification.footer');

            const message = `🚨 @everyone\n\n${emoji} **${eventName}** ${title}\n\n${startTimeLabel}:\n   • ${utcTimeLabel}: ${utcTimeString}\n   • ${localTimeLabel}: ${discordTimestamp}\n\n${footer}`;

            await channel.send(message);
            console.log(`✅ Sent notification for ${eventName} in guild ${guildId} (${language})`);

            // Update lastNotified
            guildSchedules[eventName].lastNotified = data.time;

            // If it's a recurring event, schedule next occurrence (48 hours later)
            if (isBearEvent(eventName, guildId)) {
              const nextEventTime = new Date(eventTime.getTime() + 48 * 60 * 60 * 1000);
              guildSchedules[eventName].time = nextEventTime.toISOString();
              guildSchedules[eventName].lastNotified = null; // Reset for next cycle
              console.log(`🔄 ${eventName} rescheduled to ${nextEventTime.toISOString()} for guild ${guildId}`);
            } else {
              // For single events, remove after notification
              delete guildSchedules[eventName];
              console.log(`🗑️ ${eventName} removed (single event completed) from guild ${guildId}`);
            }

            updated = true;
          }
        } catch (error) {
          console.error(`❌ Error sending notification for ${eventName} in guild ${guildId}:`, error);
        }
      }
    }
  }

  if (updated) {
    saveSchedules(allSchedules);
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
