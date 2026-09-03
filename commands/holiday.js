const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const {
  addHoliday,
  listHolidays,
  deleteHoliday,
  toggleHoliday,
  testHolidayGreeting,
  getAllHolidayNames,
  getHolidayLanguages
} = require('../holiday-scheduler');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('holiday')
    .setDescription('Manage automatic holiday greetings')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand(subcommand =>
      subcommand
        .setName('add')
        .setDescription('Add or update a holiday greeting')
        .addStringOption(option =>
          option
            .setName('name')
            .setDescription('Holiday name (e.g., "Chinese New Year")')
            .setRequired(true)
        )
        .addStringOption(option =>
          option
            .setName('calendar')
            .setDescription('Calendar type')
            .setRequired(true)
            .addChoices(
              { name: 'Solar Calendar', value: 'solar' },
              { name: 'Lunar Calendar', value: 'lunar' }
            )
        )
        .addIntegerOption(option =>
          option
            .setName('month')
            .setDescription('Month (1-12)')
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(12)
        )
        .addIntegerOption(option =>
          option
            .setName('day')
            .setDescription('Day (1-31)')
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(31)
        )
        .addStringOption(option =>
          option
            .setName('language')
            .setDescription('Language/Region')
            .setRequired(true)
            .addChoices(
              { name: 'Traditional Chinese', value: 'zh-TW' },
              { name: 'Tagalog', value: 'tl' },
              { name: 'Bisaya/Cebuano', value: 'ceb' },
              { name: 'Indonesian', value: 'id' },
              { name: 'English', value: 'en' }
            )
        )
        .addChannelOption(option =>
          option
            .setName('channel')
            .setDescription('Channel to send greeting')
            .setRequired(true)
        )
        .addStringOption(option =>
          option
            .setName('message')
            .setDescription('Greeting message')
            .setRequired(true)
        )
        .addStringOption(option =>
          option
            .setName('gif_keyword')
            .setDescription('Giphy search keyword for GIF')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('list')
        .setDescription('List all configured holidays')
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('delete')
        .setDescription('Delete a holiday')
        .addStringOption(option =>
          option
            .setName('name')
            .setDescription('Holiday name')
            .setRequired(true)
            .setAutocomplete(true)
        )
        .addStringOption(option =>
          option
            .setName('language')
            .setDescription('Language/Region')
            .setRequired(true)
            .setAutocomplete(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('disable')
        .setDescription('Disable a holiday (keep in database)')
        .addStringOption(option =>
          option
            .setName('name')
            .setDescription('Holiday name')
            .setRequired(true)
            .setAutocomplete(true)
        )
        .addStringOption(option =>
          option
            .setName('language')
            .setDescription('Language/Region')
            .setRequired(true)
            .setAutocomplete(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('enable')
        .setDescription('Enable a disabled holiday')
        .addStringOption(option =>
          option
            .setName('name')
            .setDescription('Holiday name')
            .setRequired(true)
            .setAutocomplete(true)
        )
        .addStringOption(option =>
          option
            .setName('language')
            .setDescription('Language/Region')
            .setRequired(true)
            .setAutocomplete(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('test')
        .setDescription('Send a test greeting immediately')
        .addStringOption(option =>
          option
            .setName('name')
            .setDescription('Holiday name')
            .setRequired(true)
            .setAutocomplete(true)
        )
        .addStringOption(option =>
          option
            .setName('language')
            .setDescription('Language/Region')
            .setRequired(true)
            .setAutocomplete(true)
        )
    ),

  async handleAutocomplete(interaction) {
    const subcommand = interaction.options.getSubcommand();
    const focusedOption = interaction.options.getFocused(true);

    try {
      if (focusedOption.name === 'name') {
        const holidayNames = await getAllHolidayNames();
        const filtered = holidayNames
          .filter(name => name.toLowerCase().includes(focusedOption.value.toLowerCase()))
          .slice(0, 25);

        await interaction.respond(
          filtered.map(name => ({ name, value: name }))
        );
      } else if (focusedOption.name === 'language') {
        const holidayName = interaction.options.getString('name');
        if (holidayName) {
          const languages = await getHolidayLanguages(holidayName);
          const languageNames = {
            'zh-TW': 'Traditional Chinese',
            'tl': 'Tagalog',
            'ceb': 'Bisaya/Cebuano',
            'id': 'Indonesian',
            'en': 'English'
          };

          await interaction.respond(
            languages.map(lang => ({
              name: languageNames[lang] || lang,
              value: lang
            }))
          );
        } else {
          await interaction.respond([]);
        }
      }
    } catch (error) {
      console.error('Error in holiday autocomplete:', error);
      await interaction.respond([]);
    }
  },

  async handleHoliday(interaction) {
    const subcommand = interaction.options.getSubcommand();

    try {
      if (subcommand === 'add') {
        const name = interaction.options.getString('name');
        const calendarType = interaction.options.getString('calendar');
        const month = interaction.options.getInteger('month');
        const day = interaction.options.getInteger('day');
        const language = interaction.options.getString('language');
        const channel = interaction.options.getChannel('channel');
        const message = interaction.options.getString('message');
        const gifKeyword = interaction.options.getString('gif_keyword');

        const result = await addHoliday(
          name,
          calendarType,
          month,
          day,
          language,
          channel.id,
          message,
          gifKeyword
        );

        await interaction.reply({
          content: result.message,
          ephemeral: true
        });
      } else if (subcommand === 'list') {
        const list = await listHolidays();
        await interaction.reply({
          content: list,
          ephemeral: true
        });
      } else if (subcommand === 'delete') {
        const name = interaction.options.getString('name');
        const language = interaction.options.getString('language');

        const result = await deleteHoliday(name, language);
        await interaction.reply({
          content: result.message,
          ephemeral: true
        });
      } else if (subcommand === 'disable') {
        const name = interaction.options.getString('name');
        const language = interaction.options.getString('language');

        const result = await toggleHoliday(name, language, false);
        await interaction.reply({
          content: result.message,
          ephemeral: true
        });
      } else if (subcommand === 'enable') {
        const name = interaction.options.getString('name');
        const language = interaction.options.getString('language');

        const result = await toggleHoliday(name, language, true);
        await interaction.reply({
          content: result.message,
          ephemeral: true
        });
      } else if (subcommand === 'test') {
        const name = interaction.options.getString('name');
        const language = interaction.options.getString('language');

        const result = await testHolidayGreeting(interaction.client, name, language);
        await interaction.reply({
          content: result.message,
          ephemeral: true
        });
      }
    } catch (error) {
      console.error('Error in /holiday command:', error);
      await interaction.reply({
        content: '❌ An error occurred while processing the command',
        ephemeral: true
      });
    }
  }
};
