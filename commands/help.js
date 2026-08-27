const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('顯示所有指令與功能說明'),

  async handleHelp(interaction) {
    const helpMessage = `
📖 **Hera's Decree Bot - 指令說明**

🔹 **/help**
   顯示此說明訊息

🔹 **/setup_time**
   設定活動通知時間
   • **event**: 選擇活動類型（使用選單選擇）
   • **time**: 設定 UTC 時間（格式：YYYY-MM-DD HH:MM）

   **活動類型：**
   🐻 **Bear 系列**（循環，每 48 小時自動重複）
   • Bear Trap 1
   • Bear Trap 2
   • Academy Bear Trap 1
   • Academy Bear Trap 2

   ⚔️ **其他活動**（單次通知）
   • Caesar Boss
   • Viking

🔹 **/list**
   查看所有已排程的活動與下次觸發時間

🔹 **/stop**
   停止指定活動的排程
   • **event**: 選擇要停止的活動（使用選單選擇）
   • 選擇 "All" 可清除所有排程

⏰ **通知機制：**
所有活動都會在開始前 **5 分鐘** 自動發送通知！

📝 **範例：**
\`/setup_time event:Bear Trap 1 time:2026-08-30 14:00\`
設定後會在 2026-08-30 13:55 UTC 發送通知
下次通知會自動排在 2026-09-01 13:55 UTC（48小時後）
`;

    await interaction.reply({ content: helpMessage, ephemeral: true });
  }
};
