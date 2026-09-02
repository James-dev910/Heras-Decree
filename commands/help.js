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
🔹 **/countdown** - Show upcoming events with timers
🔹 **/stop** - Stop event schedule or clear all
🔹 **/language** - Set notification language (9 languages)
🔹 **/gif** - Search & share random GIFs from Giphy
🔹 **/help** - Display this help

**Admin Commands:** 🔒
🔹 **/setup_bear_series** - Batch schedule all 4 Bear Traps
🔹 **/add_event** - Create custom event (name, emoji, type)
🔹 **/remove_event** - Delete custom event

**Default Events:**
🐻 Bear Series (48h repeat): Bear Trap 1/2, Academy Bear Trap 1/2
⚔️ Single Events: Caesar Boss, Viking

**Supported Languages:**
🇹🇼 繁中 🇺🇸 English 🇵🇭 Tagalog 🇮🇩 Indonesia 🇰🇷 한국어
🇯🇵 日本語 🇹🇭 ไทย 🇪🇸 Español 🇩🇪 Deutsch

**Key Features:**
⏰ Notifications 5 min before event
📍 Sent to channel where command was used
🌍 Multi-language with auto-detection
🕐 Shows UTC + your local time
🗑️ Single events auto-delete after notification

**Example:**
\`/countdown\` - View live countdown timers
\`/language lang:繁體中文\`
\`/setup_time event:Bear Trap 1 time:2026-08-30 14:00\`
\`/gif keyword:happy\` - Get a random happy GIF

💡 Use /setup_bear_series to schedule all Bear Traps at once!
`;

    await interaction.reply({ content: helpMessage, ephemeral: true });
  }
};
