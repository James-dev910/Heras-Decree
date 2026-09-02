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

    // 驗證範圍
    if (minValue >= maxValue) {
      await interaction.reply({
        content: '❌ 最小值必須小於最大值！',
        ephemeral: true
      });
      return;
    }

    // 生成隨機數字
    const result = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;

    // 根據結果顯示不同的 emoji
    let emoji = '🎲';
    let comment = '';

    if (result === maxValue) {
      emoji = '🎉';
      comment = '\n✨ **最大值！運氣爆棚！**';
    } else if (result === minValue) {
      emoji = '😭';
      comment = '\n💔 **最小值...好慘...**';
    } else if (result >= maxValue * 0.9) {
      emoji = '🔥';
      comment = '\n🌟 **高分！手氣不錯！**';
    } else if (result <= maxValue * 0.1) {
      emoji = '💀';
      comment = '\n😰 **低分...運氣不佳...**';
    }

    // 回應結果
    await interaction.reply({
      content: `${emoji} **${interaction.user.username}** 擲出了 **${result}** 點！\n範圍：${minValue} - ${maxValue}${comment}`
    });
  }
};
