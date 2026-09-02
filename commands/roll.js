const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roll')
    .setDescription('Roll a dice and get a random number')
    .addIntegerOption(option =>
      option
        .setName('max')
        .setDescription('Maximum number (default: 100)')
        .setRequired(false)
        .setMinValue(2)
        .setMaxValue(1000)
    )
    .addIntegerOption(option =>
      option
        .setName('min')
        .setDescription('Minimum number (default: 1)')
        .setRequired(false)
        .setMinValue(1)
        .setMaxValue(999)
    ),

  async handleRoll(interaction) {
    const maxValue = interaction.options.getInteger('max') || 100;
    const minValue = interaction.options.getInteger('min') || 1;

    // Validate range
    if (minValue >= maxValue) {
      await interaction.reply({
        content: '❌ Minimum value must be less than maximum value!',
        ephemeral: true
      });
      return;
    }

    // Generate random number
    const result = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;

    // Show different emoji based on result
    let emoji = '🎲';
    let comment = '';

    if (result === maxValue) {
      emoji = '🎉';
      comment = '\n✨ **Maximum roll! Amazing luck!**';
    } else if (result === minValue) {
      emoji = '😭';
      comment = '\n💔 **Minimum roll... Unlucky...**';
    } else if (result >= maxValue * 0.9) {
      emoji = '🔥';
      comment = '\n🌟 **High roll! Great luck!**';
    } else if (result <= maxValue * 0.1) {
      emoji = '💀';
      comment = '\n😰 **Low roll... Bad luck...**';
    }

    // Reply with result
    await interaction.reply({
      content: `${emoji} **${interaction.user.username}** rolled **${result}**!\nRange: ${minValue} - ${maxValue}${comment}`
    });
  }
};
