const { SlashCommandBuilder } = require('discord.js');

// 預設的關鍵字建議（含 emoji）
const SUGGESTED_KEYWORDS = [
  { name: '😊 happy', value: 'happy' },
  { name: '😠 angry', value: 'angry' },
  { name: '😢 sad', value: 'sad' },
  { name: '😴 sleepy', value: 'sleepy' },
  { name: '🎉 excited', value: 'excited' },
  { name: '❤️ love', value: 'love' },
  { name: '😱 shocked', value: 'shocked' },
  { name: '🤔 thinking', value: 'thinking' },
  { name: '👍 thumbs up', value: 'thumbs up' },
  { name: '🔥 fire', value: 'fire' },
  { name: '😂 laughing', value: 'laughing' },
  { name: '😭 crying', value: 'crying' },
  { name: '🥳 party', value: 'party' },
  { name: '😎 cool', value: 'cool' },
  { name: '🤗 hug', value: 'hug' },
  { name: '👏 applause', value: 'applause' },
  { name: '💪 strong', value: 'strong' },
  { name: '🎮 gaming', value: 'gaming' },
  { name: '🐱 cat', value: 'cat' },
  { name: '🐶 dog', value: 'dog' },
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gif')
    .setDescription('Search and send a random GIF from Giphy')
    .addStringOption(option =>
      option
        .setName('keyword')
        .setDescription('Enter a keyword or select from suggestions')
        .setRequired(true)
        .setAutocomplete(true)
    ),

  async handleGif(interaction) {
    const keyword = interaction.options.getString('keyword');
    const GIPHY_API_KEY = process.env.GIPHY_API_KEY;

    // 檢查 API Key 是否存在
    if (!GIPHY_API_KEY) {
      await interaction.reply({
        content: '❌ Giphy API Key 未設定！請聯繫管理員。',
        ephemeral: true
      });
      return;
    }

    // 先回應使用者，避免逾時
    await interaction.deferReply();

    try {
      // 使用 Giphy Random API（內建隨機性）
      const apiUrl = `https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}&tag=${encodeURIComponent(keyword)}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      // 檢查 API 回應
      if (!response.ok || !data.data || !data.data.images) {
        await interaction.editReply({
          content: `❌ 無法找到關鍵字「${keyword}」的 GIF，請嘗試其他關鍵字！`,
        });
        return;
      }

      // 取得 GIF URL
      const gifUrl = data.data.images.original.url;
      const gifTitle = data.data.title || keyword;

      // 只回傳 GIF URL，Discord 會自動嵌入顯示
      await interaction.editReply({
        content: gifUrl
      });

    } catch (error) {
      console.error('Error fetching GIF from Giphy:', error);
      await interaction.editReply({
        content: '❌ 取得 GIF 時發生錯誤，請稍後再試！',
      });
    }
  },

  async handleAutocomplete(interaction) {
    const focusedValue = interaction.options.getFocused().toLowerCase();

    // 如果使用者有輸入內容，優先顯示符合的建議
    if (focusedValue) {
      // 過濾符合的建議關鍵字
      const filtered = SUGGESTED_KEYWORDS
        .filter(keyword =>
          keyword.value.toLowerCase().includes(focusedValue) ||
          keyword.name.toLowerCase().includes(focusedValue)
        )
        .slice(0, 20);

      // 如果有符合的建議，顯示它們
      if (filtered.length > 0) {
        await interaction.respond(filtered);
      } else {
        // 如果沒有符合的建議，允許使用者自訂輸入
        await interaction.respond([
          { name: `🔍 搜尋: "${focusedValue}"`, value: focusedValue }
        ]);
      }
    } else {
      // 如果使用者還沒輸入，顯示前 25 個建議
      await interaction.respond(SUGGESTED_KEYWORDS.slice(0, 25));
    }
  }
};
