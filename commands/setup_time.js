const { SlashCommandBuilder } = require('discord.js');
const { scheduleEvent, EVENT_NAMES } = require('../scheduler');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup_time')
    .setDescription('設定活動通知時間')
    .addStringOption(option =>
      option
        .setName('event')
        .setDescription('選擇活動')
        .setRequired(true)
        .addChoices(
          { name: '🐻 Bear Trap 1', value: 'Bear Trap 1' },
          { name: '🐻 Bear Trap 2', value: 'Bear Trap 2' },
          { name: '🎓 Academy Bear Trap 1', value: 'Academy Bear Trap 1' },
          { name: '🎓 Academy Bear Trap 2', value: 'Academy Bear Trap 2' },
          { name: '👑 Caesar Boss', value: 'Caesar Boss' },
          { name: '⚔️ Viking', value: 'Viking' }
        )
    )
    .addStringOption(option =>
      option
        .setName('time')
        .setDescription('設定 UTC 時間（格式：YYYY-MM-DD HH:MM，例如：2026-08-30 14:00）')
        .setRequired(true)
    ),

  async handleSetupTime(interaction) {
    const eventName = interaction.options.getString('event');
    const timeString = interaction.options.getString('time');
    const channelId = interaction.channelId;
    const guildId = interaction.guildId;

    const result = scheduleEvent(eventName, timeString, channelId, guildId);

    await interaction.reply({
      content: result.message,
      ephemeral: !result.success
    });
  }
};
