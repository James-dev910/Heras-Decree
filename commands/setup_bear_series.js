const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { scheduleEvent } = require('../scheduler-db');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup_bear_series')
    .setDescription('Batch schedule all 4 Bear Trap events (requires Manage Server permission)')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addStringOption(option =>
      option
        .setName('bear_trap_1')
        .setDescription('Bear Trap 1 time (UTC format: YYYY-MM-DD HH:MM)')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('bear_trap_2')
        .setDescription('Bear Trap 2 time (UTC format: YYYY-MM-DD HH:MM)')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('academy_bear_trap_1')
        .setDescription('Academy Bear Trap 1 time (UTC format: YYYY-MM-DD HH:MM)')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('academy_bear_trap_2')
        .setDescription('Academy Bear Trap 2 time (UTC format: YYYY-MM-DD HH:MM)')
        .setRequired(true)
    )
    .addChannelOption(option =>
      option
        .setName('channel')
        .setDescription('Channel for notifications (defaults to current channel)')
        .setRequired(false)
    ),

  async handleSetupBearSeries(interaction) {
    const bearTrap1Time = interaction.options.getString('bear_trap_1');
    const bearTrap2Time = interaction.options.getString('bear_trap_2');
    const academyBearTrap1Time = interaction.options.getString('academy_bear_trap_1');
    const academyBearTrap2Time = interaction.options.getString('academy_bear_trap_2');
    const channel = interaction.options.getChannel('channel') || interaction.channel;

    const guildId = interaction.guildId;
    const userId = interaction.user.id;
    const discordLocale = interaction.locale;

    // Defer reply since we'll be making multiple database calls
    await interaction.deferReply();

    const bearEvents = [
      { name: 'Bear Trap 1', time: bearTrap1Time },
      { name: 'Bear Trap 2', time: bearTrap2Time },
      { name: 'Academy Bear Trap 1', time: academyBearTrap1Time },
      { name: 'Academy Bear Trap 2', time: academyBearTrap2Time }
    ];

    let successCount = 0;
    let failureCount = 0;
    let resultMessages = [];

    // Schedule each event
    for (const event of bearEvents) {
      const result = await scheduleEvent(
        event.name,
        event.time,
        channel.id,
        guildId,
        userId,
        discordLocale
      );

      if (result.success) {
        successCount++;
        resultMessages.push(`✅ **${event.name}**: ${event.time} UTC`);
      } else {
        failureCount++;
        resultMessages.push(`❌ **${event.name}**: ${result.message}`);
      }
    }

    // Build final response
    let responseMessage = '📋 **Bear Trap Series Batch Scheduling Results:**\n\n';
    responseMessage += resultMessages.join('\n');
    responseMessage += `\n\n📊 **Summary**: ${successCount} scheduled successfully, ${failureCount} failed`;

    if (successCount > 0) {
      responseMessage += `\n📢 Notifications will be sent to ${channel} 5 minutes before each event`;
      responseMessage += `\n🔄 All Bear Trap events are recurring (every 48 hours)`;
    }

    await interaction.editReply({ content: responseMessage });
  }
};
