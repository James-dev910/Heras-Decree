const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { removeCustomEvent, getGuildCustomEvents } = require('../scheduler');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('remove_event')
    .setDescription('Remove a custom event (requires Manage Server permission)')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addStringOption(option =>
      option
        .setName('name')
        .setDescription('Custom event name to remove')
        .setRequired(true)
        .setAutocomplete(true)
    ),

  async handleRemoveEvent(interaction) {
    const eventName = interaction.options.getString('name');
    const guildId = interaction.guildId;

    const result = removeCustomEvent(eventName, guildId);

    await interaction.reply({
      content: result.message,
      ephemeral: !result.success
    });
  },

  async handleAutocomplete(interaction) {
    const guildId = interaction.guildId;
    const customEvents = getGuildCustomEvents(guildId);
    const focusedValue = interaction.options.getFocused();

    const choices = Object.keys(customEvents)
      .filter(name => name.toLowerCase().includes(focusedValue.toLowerCase()))
      .slice(0, 25)
      .map(name => ({ name: name, value: name }));

    await interaction.respond(choices);
  }
};
