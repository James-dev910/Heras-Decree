const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { addCustomEvent } = require('../scheduler');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('add_event')
    .setDescription('Add a custom event (requires Manage Server permission)')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addStringOption(option =>
      option
        .setName('name')
        .setDescription('Event name (e.g., testevent)')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('emoji')
        .setDescription('Emoji for the event (e.g., 😂 or :joy:)')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('type')
        .setDescription('Event type')
        .setRequired(true)
        .addChoices(
          { name: '🔄 Recurring (every 48 hours)', value: 'recurring' },
          { name: '📅 Single (one-time)', value: 'single' }
        )
    ),

  async handleAddEvent(interaction) {
    const eventName = interaction.options.getString('name');
    const emoji = interaction.options.getString('emoji');
    const type = interaction.options.getString('type');
    const guildId = interaction.guildId;

    const result = addCustomEvent(eventName, emoji, type, guildId);

    await interaction.reply({
      content: result.message,
      ephemeral: !result.success
    });
  }
};
