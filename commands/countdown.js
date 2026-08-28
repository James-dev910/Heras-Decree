const { SlashCommandBuilder } = require('discord.js');
const { pool } = require('../database');

// Helper function to format time remaining
function formatTimeRemaining(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);

  return parts.join(' ');
}

// Get event emoji
async function getEventEmoji(eventName, guildId) {
  const { getGuildCustomEvents } = require('../scheduler-db');
  const customEvents = await getGuildCustomEvents(guildId);
  if (customEvents[eventName]) {
    return customEvents[eventName].emoji || '⚔️';
  }
  return '⚔️';
}

// Convert date to Discord timestamp
function toDiscordTimestamp(date, style = 'R') {
  const unixTimestamp = Math.floor(date.getTime() / 1000);
  return `<t:${unixTimestamp}:${style}>`;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('countdown')
    .setDescription('Show upcoming events with countdown timers'),

  async handleCountdown(interaction) {
    const guildId = interaction.guildId;

    try {
      const result = await pool.query(
        'SELECT event_name, event_time, type FROM schedules WHERE guild_id = $1 ORDER BY event_time',
        [guildId]
      );

      if (result.rows.length === 0) {
        await interaction.reply({
          content: '📋 No scheduled events to countdown',
          ephemeral: true
        });
        return;
      }

      const now = new Date();
      let message = '⏰ **Upcoming Events Countdown:**\n\n';

      for (const row of result.rows) {
        const eventTime = new Date(row.event_time);
        const timeRemaining = eventTime.getTime() - now.getTime();

        const emoji = await getEventEmoji(row.event_name, guildId);
        const typeIcon = row.type === 'recurring' ? '🔄' : '📅';
        const relativeTime = toDiscordTimestamp(eventTime, 'R');

        if (timeRemaining > 0) {
          // Event is in the future
          const countdown = formatTimeRemaining(timeRemaining);
          message += `${emoji} **${row.event_name}** ${typeIcon}\n`;
          message += `   • Time: ${relativeTime}\n`;
          message += `   • Countdown: \`${countdown}\`\n`;
          message += `   • Notification: 5 minutes before\n\n`;
        } else {
          // Event is in the past (waiting for notification or processing)
          const timePassed = formatTimeRemaining(Math.abs(timeRemaining));
          message += `${emoji} **${row.event_name}** ${typeIcon}\n`;
          message += `   • Status: ⏳ Processing (started ${timePassed} ago)\n\n`;
        }
      }

      message += '💡 *Use `/list` to see full event details*';

      await interaction.reply({ content: message.trim() });
    } catch (error) {
      console.error('Error in countdown command:', error);
      await interaction.reply({
        content: '❌ Database error occurred',
        ephemeral: true
      });
    }
  }
};
