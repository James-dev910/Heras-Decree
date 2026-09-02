const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('flip')
    .setDescription('Flip a coin - heads or tails'),

  async handleFlip(interaction) {
    // Generate random result (0 or 1)
    const result = Math.random() < 0.5;

    // Animation effect: show flipping
    await interaction.reply({
      content: '🪙 *The coin is flipping...*'
    });

    // Wait 1.5 seconds then show result
    setTimeout(async () => {
      const resultText = result ? 'Heads' : 'Tails';
      const emoji = result ? '✅' : '❌';

      await interaction.editReply({
        content: `🪙 **The coin has landed!**\n\n${emoji} Result: **${resultText}**`
      });
    }, 1500);
  }
};
