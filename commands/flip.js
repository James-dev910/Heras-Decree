const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('flip')
    .setDescription('Flip a coin - heads or tails'),

  async handleFlip(interaction) {
    // 生成隨機結果（0 或 1）
    const result = Math.random() < 0.5;

    // 動畫效果：先顯示投擲中
    await interaction.reply({
      content: '🪙 硬幣在空中旋轉...'
    });

    // 等待 1.5 秒後顯示結果
    setTimeout(async () => {
      const resultText = result ? '正面' : '反面';
      const emoji = result ? '✅' : '❌';
      const englishText = result ? 'Heads' : 'Tails';

      await interaction.editReply({
        content: `🪙 硬幣落地了！\n\n${emoji} 結果：**${resultText}** (${englishText})`
      });
    }, 1500);
  }
};
