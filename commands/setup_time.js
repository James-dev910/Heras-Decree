const { SlashCommandBuilder } = require('discord.js');
const { scheduleEvent, getAllEventNames } = require('../scheduler');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup_time')
    .setDescription('Schedule event notification time')
    .addStringOption(option =>
      option
        .setName('event')
        .setDescription('Select event')
        .setRequired(true)
        .setAutocomplete(true)
    )
    .addStringOption(option =>
      option
        .setName('time')
        .setDescription('Set UTC time (format: YYYY-MM-DD HH:MM, e.g., 2026-08-30 14:00)')
        .setRequired(true)
    ),

  async handleSetupTime(interaction) {
    const eventName = interaction.options.getString('event');
    const timeString = interaction.options.getString('time');
    const channelId = interaction.channelId;
    const guildId = interaction.guildId;
    const userId = interaction.user.id;
    const discordLocale = interaction.locale;

    const result = scheduleEvent(eventName, timeString, channelId, guildId, userId, discordLocale);

    await interaction.reply({
      content: result.message,
      ephemeral: !result.success
    });
  },

  async handleAutocomplete(interaction) {
    const guildId = interaction.guildId;
    const allEvents = getAllEventNames(guildId);
    const focusedValue = interaction.options.getFocused();

    const choices = allEvents
      .filter(name => name.toLowerCase().includes(focusedValue.toLowerCase()))
      .slice(0, 25)
      .map(name => ({ name: name, value: name }));

    await interaction.respond(choices);
  }
};
