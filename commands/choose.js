const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('choose')
    .setDescription('Help you make a choice from multiple options')
    .addStringOption(option =>
      option
        .setName('options')
        .setDescription('Enter options separated by commas (e.g., pizza,burger,sushi)')
        .setRequired(true)
    ),

  async handleChoose(interaction) {
    const optionsInput = interaction.options.getString('options');

    // Split options (supports both English and Chinese commas)
    const options = optionsInput
      .split(/[,，]/)
      .map(opt => opt.trim())
      .filter(opt => opt.length > 0);

    // Validate option count
    if (options.length < 2) {
      await interaction.reply({
        content: '❌ Please provide at least 2 options!\nExample: `/choose options:pizza,burger,sushi`',
        ephemeral: true
      });
      return;
    }

    if (options.length > 20) {
      await interaction.reply({
        content: '❌ Too many options! Maximum 20 options.',
        ephemeral: true
      });
      return;
    }

    // Show thinking animation
    await interaction.reply({
      content: '🤔 *Let me think...*'
    });

    // Wait 1 second then show result
    setTimeout(async () => {
      // Randomly select one option
      const choice = options[Math.floor(Math.random() * options.length)];

      // Display all options
      const optionsList = options.map((opt, index) =>
        opt === choice ? `${index + 1}. **${opt}** ⭐` : `${index + 1}. ${opt}`
      ).join('\n');

      await interaction.editReply({
        content: `🎯 **Fate has decided...**\n\nI choose: **${choice}** ✨\n\nAll options:\n${optionsList}\n\n💡 Trust in destiny!`
      });
    }, 1000);
  }
};
