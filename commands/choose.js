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

    // 分割選項（支援中文逗號和英文逗號）
    const options = optionsInput
      .split(/[,，]/)
      .map(opt => opt.trim())
      .filter(opt => opt.length > 0);

    // 驗證選項數量
    if (options.length < 2) {
      await interaction.reply({
        content: '❌ 請至少提供 2 個選項！\n範例：`/choose options:打熊,打Viking,睡覺`',
        ephemeral: true
      });
      return;
    }

    if (options.length > 20) {
      await interaction.reply({
        content: '❌ 選項太多了！最多 20 個選項。',
        ephemeral: true
      });
      return;
    }

    // 顯示思考動畫
    await interaction.reply({
      content: '🤔 讓我想想...'
    });

    // 等待 1 秒後顯示結果
    setTimeout(async () => {
      // 隨機選擇一個選項
      const choice = options[Math.floor(Math.random() * options.length)];

      // 顯示所有選項
      const optionsList = options.map((opt, index) =>
        opt === choice ? `${index + 1}. **${opt}** ⭐` : `${index + 1}. ${opt}`
      ).join('\n');

      await interaction.editReply({
        content: `🎯 **命運的選擇...**\n\n我選擇：**${choice}** ✨\n\n所有選項：\n${optionsList}\n\n💡 相信命運的安排！`
      });
    }, 1000);
  }
};
