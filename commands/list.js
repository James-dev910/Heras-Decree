const { SlashCommandBuilder } = require('discord.js');
const { listScheduledEvents } = require('../scheduler');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('list')
    .setDescription('查看所有已排程的活動'),

  async handleList(interaction) {
    const guildId = interaction.guildId;
    const message = listScheduledEvents(guildId);
    await interaction.reply({ content: message, ephemeral: true });
  }
};
