const { SlashCommandBuilder } = require('discord.js');
const {
  addBirthday,
  listBirthdays,
  removeBirthday,
  testBirthdayGreeting,
  getUpcomingBirthdays,
  getAllBirthdayUsers,
  getBirthdayInfo
} = require('../birthday-scheduler');
const { getAvailableLanguages } = require('../birthday-templates');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('birthday')
    .setDescription('Manage birthday greetings')
    .addSubcommand(subcommand =>
      subcommand
        .setName('add')
        .setDescription('Add a birthday for a user')
        .addUserOption(option =>
          option
            .setName('user')
            .setDescription('The user')
            .setRequired(true)
        )
        .addIntegerOption(option =>
          option
            .setName('month')
            .setDescription('Birth month (1-12)')
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(12)
        )
        .addIntegerOption(option =>
          option
            .setName('day')
            .setDescription('Birth day (1-31)')
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(31)
        )
        .addChannelOption(option =>
          option
            .setName('channel')
            .setDescription('Channel to send birthday greeting (optional)')
            .setRequired(false)
        )
        .addStringOption(option =>
          option
            .setName('message')
            .setDescription('Custom birthday message (optional)')
            .setRequired(false)
        )
        .addStringOption(option =>
          option
            .setName('language')
            .setDescription('Language for birthday greeting (default: English)')
            .setRequired(false)
            .addChoices(
              { name: '繁體中文 (Traditional Chinese)', value: 'zh-TW' },
              { name: 'English', value: 'en-US' },
              { name: 'Tagalog', value: 'tl' },
              { name: 'Indonesian', value: 'id' },
              { name: '한국어 (Korean)', value: 'ko' },
              { name: '日本語 (Japanese)', value: 'ja' },
              { name: 'Español (Spanish)', value: 'es-ES' },
              { name: 'Deutsch (German)', value: 'de' },
              { name: 'ไทย (Thai)', value: 'th' }
            )
        )
        .addIntegerOption(option =>
          option
            .setName('template')
            .setDescription('Birthday greeting template (1-5, default: 1)')
            .setRequired(false)
            .setMinValue(1)
            .setMaxValue(5)
            .addChoices(
              { name: 'Template 1 - Classic/經典祝福', value: 1 },
              { name: 'Template 2 - Warm Wishes/溫馨祝福', value: 2 },
              { name: 'Template 3 - Simple & Sweet/簡約祝福', value: 3 },
              { name: 'Template 4 - Poetic/詩意祝福', value: 4 },
              { name: 'Template 5 - Energetic/活力祝福', value: 5 }
            )
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('list')
        .setDescription('List all birthdays for this server')
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('info')
        .setDescription('View detailed birthday information for a user')
        .addUserOption(option =>
          option
            .setName('user')
            .setDescription('The user to view info for')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('remove')
        .setDescription('Remove a birthday')
        .addUserOption(option =>
          option
            .setName('user')
            .setDescription('The user')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('test')
        .setDescription('Send a test birthday greeting')
        .addUserOption(option =>
          option
            .setName('user')
            .setDescription('The user')
            .setRequired(true)
        )
        .addChannelOption(option =>
          option
            .setName('channel')
            .setDescription('Override channel (optional - for testing)')
            .setRequired(false)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('upcoming')
        .setDescription('Show upcoming birthdays')
        .addIntegerOption(option =>
          option
            .setName('days')
            .setDescription('Number of days to look ahead (default: 7)')
            .setRequired(false)
            .setMinValue(1)
            .setMaxValue(365)
        )
    ),

  async handleBirthday(interaction) {
    const subcommand = interaction.options.getSubcommand();
    const guildId = interaction.guildId;

    try {
      if (subcommand === 'add') {
        const user = interaction.options.getUser('user');
        const month = interaction.options.getInteger('month');
        const day = interaction.options.getInteger('day');
        const channel = interaction.options.getChannel('channel');
        const customMessage = interaction.options.getString('message');
        const language = interaction.options.getString('language') || 'en-US';
        const templateId = interaction.options.getInteger('template') || 1;

        const result = await addBirthday(
          guildId,
          user.id,
          user.username,
          month,
          day,
          customMessage,
          language,
          channel?.id,
          templateId
        );

        await interaction.reply({
          content: result.message,
          ephemeral: true
        });

      } else if (subcommand === 'list') {
        await interaction.deferReply({ ephemeral: true });
        const result = await listBirthdays(guildId);

        if (result.type === 'embed') {
          await interaction.editReply({
            embeds: [result.embed]
          });
        } else {
          await interaction.editReply({
            content: result.content
          });
        }

      } else if (subcommand === 'info') {
        const user = interaction.options.getUser('user');

        await interaction.deferReply({ ephemeral: true });
        const result = await getBirthdayInfo(guildId, user.id);

        if (result.type === 'embed') {
          await interaction.editReply({
            embeds: [result.embed]
          });
        } else {
          await interaction.editReply({
            content: result.content
          });
        }

      } else if (subcommand === 'remove') {
        const user = interaction.options.getUser('user');

        const result = await removeBirthday(guildId, user.id);
        await interaction.reply({
          content: result.message,
          ephemeral: true
        });

      } else if (subcommand === 'test') {
        const user = interaction.options.getUser('user');
        const channelOverride = interaction.options.getChannel('channel');

        await interaction.deferReply({ ephemeral: true });

        const result = await testBirthdayGreeting(
          interaction.client,
          guildId,
          user.id,
          channelOverride?.id
        );

        await interaction.editReply({
          content: result.message
        });

      } else if (subcommand === 'upcoming') {
        const days = interaction.options.getInteger('days') || 7;

        await interaction.deferReply({ ephemeral: true });
        const result = await getUpcomingBirthdays(guildId, days);

        if (result.type === 'embed') {
          await interaction.editReply({
            embeds: [result.embed]
          });
        } else {
          await interaction.editReply({
            content: result.content
          });
        }
      }
    } catch (error) {
      console.error('Error in /birthday command:', error);

      const errorMessage = '❌ An error occurred while processing the command';
      if (interaction.deferred) {
        await interaction.editReply({ content: errorMessage });
      } else {
        await interaction.reply({
          content: errorMessage,
          ephemeral: true
        });
      }
    }
  }
};
