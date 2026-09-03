const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show all commands and features'),

  async handleHelp(interaction) {
    const helpMessage = `
📖 **Hera's Decree Bot - Commands**

**Event Scheduling:**
• \`/setup_time\` - Schedule event (YYYY-MM-DD HH:MM UTC)
• \`/list\` - View scheduled events
• \`/countdown\` - Show event timers
• \`/stop\` - Stop event or clear all
• \`/setup_bear_series\` - Schedule all 4 Bear Traps 🔒

**Fun Commands:** 🎮
• \`/gif\` - Random GIFs • \`/roll\` - Dice roll
• \`/flip\` - Coin flip • \`/choose\` - Random choice
• \`/8ball\` - Magic 8 Ball

**Holiday Greetings:** 🎉
• \`/holiday setup\` - Install holiday templates 🔒
• \`/holiday list\` - View configured holidays
• \`/holiday test\` - Test greeting
Supports 23+ holidays (Chinese, Tagalog, Bisaya, Indonesian, English)
Auto lunar calendar conversion (Chinese New Year, Mid-Autumn, etc.)

**Other:**
• \`/language\` - Set notification language
• \`/add_event\` / \`/remove_event\` - Custom events 🔒

**Features:**
⏰ Notifications 5min before • 🌍 9 languages
🕐 UTC + local time • 🎯 Multi-server support

**Examples:**
\`/countdown\`
\`/setup_time event:Bear Trap 1 time:2026-12-25 14:00\`
\`/holiday setup language:English channel:#general\`
\`/roll max:20\` • \`/8ball question:Will I win?\`
`;

    await interaction.reply({ content: helpMessage, ephemeral: true });
  }
};
