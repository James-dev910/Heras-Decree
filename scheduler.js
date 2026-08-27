const fs = require('fs');
const path = require('path');

const SCHEDULER_FILE = path.join(__dirname, 'scheduler-data.json');

// Event categories
const BEAR_EVENTS = [
  'Bear Trap 1',
  'Bear Trap 2',
  'Academy Bear Trap 1',
  'Academy Bear Trap 2'
];

const EVENT_NAMES = [
  'Bear Trap 1',
  'Bear Trap 2',
  'Academy Bear Trap 1',
  'Academy Bear Trap 2',
  'Caesar Boss',
  'Viking'
];

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

// Schedule an event
function scheduleEvent(eventName, timeString, channelId, guildId) {
  if (!EVENT_NAMES.includes(eventName)) {
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
  const isBearEvent = BEAR_EVENTS.includes(eventName);

  guildSchedules[eventName] = {
    time: eventTime.toISOString(),
    channelId: channelId,
    type: isBearEvent ? 'recurring' : 'single',
    lastNotified: null
  };

  saveGuildSchedules(guildId, guildSchedules);

  const eventType = isBearEvent ? '(Recurring, every 48 hours)' : '(One-time)';
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

    const year = eventTime.getUTCFullYear();
    const month = String(eventTime.getUTCMonth() + 1).padStart(2, '0');
    const day = String(eventTime.getUTCDate()).padStart(2, '0');
    const hours = String(eventTime.getUTCHours()).padStart(2, '0');
    const minutes = String(eventTime.getUTCMinutes()).padStart(2, '0');
    const timeString = `${year}-${month}-${day} ${hours}:${minutes}`;

    const typeIcon = data.type === 'recurring' ? '🔄' : '📅';
    const status = now >= notificationTime ? '⏳ Sending soon' : '⏰ Scheduled';

    message += `${typeIcon} **${eventName}**\n`;
    message += `   └ Event time: ${timeString} UTC\n`;
    message += `   └ Notification: 5 minutes before\n`;
    message += `   └ Status: ${status}\n\n`;
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
            const message = `🚨 @everyone ⚔️ **${eventName}** starts in **5 minutes**! Get ready for the battle! 🛡️`;
            await channel.send(message);
            console.log(`✅ Sent notification for ${eventName} in guild ${guildId}`);

            // Update lastNotified
            guildSchedules[eventName].lastNotified = data.time;

            // If it's a Bear event, schedule next occurrence (48 hours later)
            if (BEAR_EVENTS.includes(eventName)) {
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
  EVENT_NAMES,
  BEAR_EVENTS
};
