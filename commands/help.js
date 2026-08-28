const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show all commands and features'),

  async handleHelp(interaction) {
    const helpMessage = `
📖 **Hera's Decree Bot - Commands Guide**

🔹 **/help**
   Display this help message

🔹 **/setup_time**
   Schedule event notification time
   • **event**: Select event type (autocomplete search)
   • **time**: Set UTC time (format: YYYY-MM-DD HH:MM)

   **Default Event Types:**
   🐻 **Bear Series** (Recurring, auto-repeats every 48 hours)
   • Bear Trap 1, Bear Trap 2, Academy Bear Trap 1, Academy Bear Trap 2

   ⚔️ **Other Events** (One-time notification)
   • Caesar Boss, Viking

🔹 **/list**
   View all scheduled events and their next trigger times

🔹 **/stop**
   Stop event schedule
   • **event**: Select event to stop (autocomplete search)
   • Select "All" to clear all schedules

🔹 **/add_event** ✨ 🔒
   Add a custom event (requires Manage Server permission)
   • **name**: Event name (e.g., "testevent")
   • **emoji**: Emoji for the event (e.g., 😂 or :joy:)
   • **type**: Select "Recurring" (48h) or "Single" (one-time)

🔹 **/remove_event** 🗑️ 🔒
   Remove a custom event (requires Manage Server permission)
   • **name**: Custom event name to remove (autocomplete search)
   • Note: Cannot remove events with active schedules (stop them first)

🔒 **Permission Requirements:**
• /add_event and /remove_event require "Manage Server" permission
• All other commands are available to everyone

⏰ **Notification System:**
All events will send notifications **5 minutes** before the start time!

📍 **Notification Channel:**
Notifications will be sent to **the channel where you execute the /setup_time command**.
• Set in Channel A → Notification sent to Channel A
• Set in Channel B → Notification sent to Channel B
• Re-setting an event in a different channel will change the notification location

📝 **Examples:**
\`/add_event name:testevent emoji:😂 type:Single\`
\`/setup_time event:testevent time:2026-08-30 14:00\`

→ Notification format:
\`\`\`
🚨 @everyone

😂 **testevent** starts in **5 minutes**!

⏰ Start Time: [Automatically displays in your local timezone]

🛡️ Get ready for the battle!
\`\`\`

💡 **Smart Timezone Display:**
The bot uses Discord's built-in timestamp feature, which automatically shows the event time in **each user's local timezone**!
• Taiwan user sees: 2026年8月30日 22:00
• Japan user sees: 2026年8月30日 23:00
• US user sees: August 30, 2026 6:00 AM
`;

    await interaction.reply({ content: helpMessage, ephemeral: true });
  }
};
