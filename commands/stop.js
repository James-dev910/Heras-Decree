const { SlashCommandBuilder } = require('discord.js');
const { stopEvent, EVENT_NAMES } = require('../scheduler');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('停止活動排程')
    .addStringOption(option =>
      option
        .setName('event')
        .setDescription('選擇要停止的活動')
        .setRequired(true)
        .addChoices(
          { name: '🐻 Bear Trap 1', value: 'Bear Trap 1' },
          { name: '🐻 Bear Trap 2', value: 'Bear Trap 2' },
          { name: '🎓 Academy Bear Trap 1', value: 'Academy Bear Trap 1' },
          { name: '🎓 Academy Bear Trap 2', value: 'Academy Bear Trap 2' },
          { name: '👑 Caesar Boss', value: 'Caesar Boss' },
          { name: '⚔️ Viking', value: 'Viking' },
          { name: '🗑️ All（清除所有排程）', value: 'All' }
        )
    ),

  async handleStop(interaction) {
    const eventName = interaction.options.getString('event');
    const result = stopEvent(eventName);

    await interaction.reply({
      content: result.message,
      ephemeral: !result.success
    });
  }
};
