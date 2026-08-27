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
   • **event**: Select event type (use dropdown menu)
   • **time**: Set UTC time (format: YYYY-MM-DD HH:MM)

   **Event Types:**
   🐻 **Bear Series** (Recurring, auto-repeats every 48 hours)
   • Bear Trap 1
   • Bear Trap 2
   • Academy Bear Trap 1
   • Academy Bear Trap 2

   ⚔️ **Other Events** (One-time notification)
   • Caesar Boss
   • Viking

🔹 **/list**
   View all scheduled events and their next trigger times

🔹 **/stop**
   Stop event schedule
   • **event**: Select event to stop (use dropdown menu)
   • Select "All" to clear all schedules

⏰ **Notification System:**
All events will send notifications **5 minutes** before the start time!

📍 **Notification Channel:**
Notifications will be sent to **the channel where you execute the /setup_time command**.
• Set in Channel A → Notification sent to Channel A
• Set in Channel B → Notification sent to Channel B
• Re-setting an event in a different channel will change the notification location

📝 **Example:**
\`/setup_time event:Bear Trap 1 time:2026-08-30 14:00\`
→ Notification at 2026-08-30 13:55 UTC
→ Next notification at 2026-09-01 13:55 UTC (48 hours later)
`;

    await interaction.reply({ content: helpMessage, ephemeral: true });
  }
};
