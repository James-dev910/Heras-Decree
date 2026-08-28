const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show all commands and features'),

  async handleHelp(interaction) {
    const helpMessage = `
📖 **Hera's Decree Bot - Commands Guide**

**Basic Commands:**
🔹 **/setup_time** - Schedule event (event, time: YYYY-MM-DD HH:MM UTC)
🔹 **/list** - View all scheduled events
🔹 **/stop** - Stop event schedule or clear all
🔹 **/language** - Set notification language (9 languages)
🔹 **/help** - Display this help

**Admin Commands:** 🔒
🔹 **/add_event** - Create custom event (name, emoji, type)
🔹 **/remove_event** - Delete custom event

**Default Events:**
🐻 Bear Series (48h repeat): Bear Trap 1/2, Academy Bear Trap 1/2
⚔️ Single Events: Caesar Boss, Viking

**Supported Languages:**
🇹🇼 繁中 🇺🇸 English 🇵🇭 Tagalog 🇮🇩 Indonesia 🇰🇷 한국어
🇯🇵 日本語 🇹🇭 ไทย 🇪🇸 Español 🇩🇪 Deutsch

**Key Features:**
⏰ Notifications sent 5 minutes before event
📍 Sent to channel where /setup_time was used
🌍 Multi-language with auto-detection
🕐 Shows UTC + your local time

**Example:**
\`/language lang:繁體中文\`
\`/add_event name:test emoji:😂 type:Single\`
\`/setup_time event:test time:2026-08-30 14:00\`

💡 Notification appears in your selected language with both UTC and local time!
`;

    await interaction.reply({ content: helpMessage, ephemeral: true });
  }
};
