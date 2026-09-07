const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

// Main menu
function createMainMenu() {
  const embed = new EmbedBuilder()
    .setTitle('📖 Hera\'s Decree Bot - Help Menu')
    .setDescription('Select a category to view detailed commands and features:')
    .setColor(0x5865F2)
    .addFields(
      { name: '📅 Event Scheduling', value: 'Schedule and manage server events', inline: true },
      { name: '🎂 Birthday System', value: 'Automated birthday greetings', inline: true },
      { name: '🎉 Holiday Greetings', value: 'Multi-language holiday system', inline: true },
      { name: '🎮 Fun Commands', value: 'Entertainment & games', inline: true },
      { name: '⚙️ Settings & Other', value: 'Configuration & utilities', inline: true },
      { name: '\u200b', value: '\u200b', inline: true }
    )
    .setFooter({ text: 'Click a button below to explore each category' })
    .setTimestamp();

  const row1 = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('help_events')
        .setLabel('Event Scheduling')
        .setEmoji('📅')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('help_birthday')
        .setLabel('Birthday System')
        .setEmoji('🎂')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('help_holiday')
        .setLabel('Holiday Greetings')
        .setEmoji('🎉')
        .setStyle(ButtonStyle.Primary)
    );

  const row2 = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('help_fun')
        .setLabel('Fun Commands')
        .setEmoji('🎮')
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId('help_settings')
        .setLabel('Settings & Other')
        .setEmoji('⚙️')
        .setStyle(ButtonStyle.Secondary)
    );

  return { embeds: [embed], components: [row1, row2] };
}

// Event Scheduling page
function createEventsPage() {
  const embed = new EmbedBuilder()
    .setTitle('📅 Event Scheduling')
    .setDescription('Schedule and manage server events with automatic notifications')
    .setColor(0x5865F2)
    .addFields(
      {
        name: '📝 Commands',
        value: '`/setup_time` - Schedule an event (YYYY-MM-DD HH:MM UTC)\n`/list` - View all scheduled events\n`/countdown` - Show countdown timers for events\n`/stop` - Stop a specific event or clear all\n`/setup_bear_series` - Schedule all 4 Bear Traps 🔒',
        inline: false
      },
      {
        name: '✨ Features',
        value: '⏰ Notifications 5 minutes before event\n🕐 Shows both UTC and local time\n🎯 Multi-server support\n🔔 Auto-notifications at event time',
        inline: false
      },
      {
        name: '📌 Example',
        value: '`/setup_time event:Bear Trap 1 time:2026-12-25 14:00`\n`/countdown`',
        inline: false
      }
    )
    .setTimestamp();

  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('help_main')
        .setLabel('Back to Menu')
        .setEmoji('◀️')
        .setStyle(ButtonStyle.Secondary)
    );

  return { embeds: [embed], components: [row] };
}

// Birthday System page
function createBirthdayPage() {
  const embed = new EmbedBuilder()
    .setTitle('🎂 Birthday System')
    .setDescription('Automated birthday greetings with customizable templates')
    .setColor(0xFF6B9D)
    .addFields(
      {
        name: '📝 Commands',
        value: '`/birthday add` - Add/update user birthday\n  └ Parameters: user, month, day, template (1-5), language, channel, message\n`/birthday list` - View all server birthdays\n`/birthday info` - View detailed birthday information\n`/birthday test` - Send test greeting immediately\n`/birthday remove` - Remove a birthday\n`/birthday upcoming` - Show upcoming birthdays (default: 7 days)',
        inline: false
      },
      {
        name: '✨ Features',
        value: '🎨 5 template styles per language (Classic, Warm Wishes, Simple, Poetic, Energetic)\n🌍 9 languages supported\n⏰ Auto greeting at midnight UTC\n🎁 Animated GIFs from Giphy\n👤 User mention with avatar',
        inline: false
      },
      {
        name: '📌 Example',
        value: '`/birthday add user:@User month:9 day:15 template:2 language:English`',
        inline: false
      }
    )
    .setTimestamp();

  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('help_main')
        .setLabel('Back to Menu')
        .setEmoji('◀️')
        .setStyle(ButtonStyle.Secondary)
    );

  return { embeds: [embed], components: [row] };
}

// Holiday Greetings page
function createHolidayPage() {
  const embed = new EmbedBuilder()
    .setTitle('🎉 Holiday Greetings')
    .setDescription('Multi-language holiday greeting system with lunar calendar support')
    .setColor(0xFFA500)
    .addFields(
      {
        name: '📝 Commands',
        value: '`/holiday setup` - Install holiday templates 🔒\n`/holiday list` - View configured holidays\n`/holiday add` - Add custom holiday\n`/holiday test` - Send test greeting\n`/holiday delete` - Remove holiday\n`/holiday toggle` - Enable/disable holiday',
        inline: false
      },
      {
        name: '✨ Features',
        value: '🎊 23+ holidays supported\n🌙 Auto lunar calendar conversion\n🌍 Multiple languages (Chinese, English, Tagalog, Bisaya, Indonesian)\n🎁 Animated GIFs from Giphy\n📅 Both solar and lunar calendar support',
        inline: false
      },
      {
        name: '🎯 Supported Holidays',
        value: 'Chinese New Year, Lantern Festival, Mid-Autumn Festival, Christmas, New Year, Valentine\'s Day, Easter, Halloween, Thanksgiving, and many more!',
        inline: false
      },
      {
        name: '📌 Example',
        value: '`/holiday setup language:English channel:#general`\n`/holiday list`',
        inline: false
      }
    )
    .setTimestamp();

  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('help_main')
        .setLabel('Back to Menu')
        .setEmoji('◀️')
        .setStyle(ButtonStyle.Secondary)
    );

  return { embeds: [embed], components: [row] };
}

// Fun Commands page
function createFunPage() {
  const embed = new EmbedBuilder()
    .setTitle('🎮 Fun Commands')
    .setDescription('Entertainment commands and games for your server')
    .setColor(0x57F287)
    .addFields(
      {
        name: '🎲 Commands',
        value: '`/gif` - Get random GIFs from Giphy\n  └ Categories: funny, cat, dog, dance, fail, food, love, party, reaction\n`/roll` - Roll dice (default: 1-100, custom max value)\n`/flip` - Flip a coin (heads or tails)\n`/choose` - Random choice from options (comma-separated)\n`/8ball` - Ask the Magic 8 Ball a question',
        inline: false
      },
      {
        name: '📌 Examples',
        value: '`/gif category:cat`\n`/roll max:20`\n`/flip`\n`/choose options:Pizza, Burger, Sushi`\n`/8ball question:Will I win today?`',
        inline: false
      }
    )
    .setTimestamp();

  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('help_main')
        .setLabel('Back to Menu')
        .setEmoji('◀️')
        .setStyle(ButtonStyle.Secondary)
    );

  return { embeds: [embed], components: [row] };
}

// Settings & Other page
function createSettingsPage() {
  const embed = new EmbedBuilder()
    .setTitle('⚙️ Settings & Other')
    .setDescription('Configuration and utility commands')
    .setColor(0x99AAB5)
    .addFields(
      {
        name: '🌍 Language Settings',
        value: '`/language` - Set your notification language\n  └ Supported: Traditional Chinese, English, Tagalog, Indonesian, Korean, Japanese, Spanish, German, Thai',
        inline: false
      },
      {
        name: '🎯 Custom Events',
        value: '`/add_event` - Add custom event type 🔒\n`/remove_event` - Remove custom event 🔒',
        inline: false
      },
      {
        name: '📚 Information',
        value: '`/help` - Show this help menu',
        inline: false
      },
      {
        name: '🔒 Permission Note',
        value: 'Commands marked with 🔒 require administrator permissions',
        inline: false
      }
    )
    .setTimestamp();

  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('help_main')
        .setLabel('Back to Menu')
        .setEmoji('◀️')
        .setStyle(ButtonStyle.Secondary)
    );

  return { embeds: [embed], components: [row] };
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show all commands and features'),

  async handleHelp(interaction) {
    const mainMenu = createMainMenu();
    await interaction.reply({ ...mainMenu, ephemeral: true });
  },

  // Handle button interactions
  async handleHelpButton(interaction) {
    const buttonId = interaction.customId;

    let page;
    switch (buttonId) {
      case 'help_main':
        page = createMainMenu();
        break;
      case 'help_events':
        page = createEventsPage();
        break;
      case 'help_birthday':
        page = createBirthdayPage();
        break;
      case 'help_holiday':
        page = createHolidayPage();
        break;
      case 'help_fun':
        page = createFunPage();
        break;
      case 'help_settings':
        page = createSettingsPage();
        break;
      default:
        return;
    }

    await interaction.update(page);
  }
};
