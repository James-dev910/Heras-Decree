const { SlashCommandBuilder } = require('discord.js');
const { stopEvent, getAllEventNames } = require('../scheduler-db');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stop event schedule')
    .addStringOption(option =>
      option
        .setName('event')
        .setDescription('Select event to stop')
        .setRequired(true)
        .setAutocomplete(true)
    ),

  async handleStop(interaction) {
    const eventName = interaction.options.getString('event');
    const guildId = interaction.guildId;
    const result = await stopEvent(eventName, guildId);

    await interaction.reply({
      content: result.message,
      ephemeral: !result.success
    });
  },

  async handleAutocomplete(interaction) {
    const guildId = interaction.guildId;
    const allEvents = await getAllEventNames(guildId);
    const focusedValue = interaction.options.getFocused();

    // Add "All" option
    const allOption = [{ name: '🗑️ All (Clear all schedules)', value: 'All' }];

    const eventChoices = allEvents
      .filter(name => name.toLowerCase().includes(focusedValue.toLowerCase()))
      .slice(0, 24)
      .map(name => ({ name: name, value: name }));

    const choices = [...allOption, ...eventChoices];

    await interaction.respond(choices);
  }
};
