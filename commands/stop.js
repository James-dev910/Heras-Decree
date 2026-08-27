const { SlashCommandBuilder } = require('discord.js');
const { stopEvent, EVENT_NAMES } = require('../scheduler');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stop event schedule')
    .addStringOption(option =>
      option
        .setName('event')
        .setDescription('Select event to stop')
        .setRequired(true)
        .addChoices(
          { name: '🐻 Bear Trap 1', value: 'Bear Trap 1' },
          { name: '🐻 Bear Trap 2', value: 'Bear Trap 2' },
          { name: '🎓 Academy Bear Trap 1', value: 'Academy Bear Trap 1' },
          { name: '🎓 Academy Bear Trap 2', value: 'Academy Bear Trap 2' },
          { name: '👑 Caesar Boss', value: 'Caesar Boss' },
          { name: '⚔️ Viking', value: 'Viking' },
          { name: '🗑️ All (Clear all schedules)', value: 'All' }
        )
    ),

  async handleStop(interaction) {
    const eventName = interaction.options.getString('event');
    const guildId = interaction.guildId;
    const result = stopEvent(eventName, guildId);

    await interaction.reply({
      content: result.message,
      ephemeral: !result.success
    });
  }
};
