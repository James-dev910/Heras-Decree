require('dotenv').config();
const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { initializeDatabase, testConnection } = require('./database');
const { scheduleEvent, listScheduledEvents, stopEvent, checkAndSendNotifications } = require('./scheduler-db');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
});

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Load commands
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
}

// Register commands when bot is ready
client.once('ready', async () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  // Test database connection and initialize tables
  const dbConnected = await testConnection();
  if (dbConnected) {
    await initializeDatabase();
  } else {
    console.error('⚠️ Database connection failed - bot will not function correctly');
  }

  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

  try {
    console.log('🔄 Started refreshing application (/) commands.');

    if (process.env.GUILD_ID) {
      // Register commands to specific guild (faster for testing)
      await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
        { body: commands },
      );
      console.log(`✅ Successfully registered commands to guild ${process.env.GUILD_ID}`);
    } else {
      // Register commands globally
      await rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID),
        { body: commands },
      );
      console.log('✅ Successfully registered global commands');
    }
  } catch (error) {
    console.error('❌ Error registering commands:', error);
  }

  // Start checking for scheduled notifications every minute
  setInterval(() => {
    checkAndSendNotifications(client);
  }, 60000); // Check every 60 seconds

  console.log('⏰ Scheduler initialized - checking for events every minute');
});

// Handle autocomplete interactions
client.on('interactionCreate', async interaction => {
  if (interaction.isAutocomplete()) {
    const { commandName } = interaction;

    try {
      if (commandName === 'setup_time') {
        const { handleAutocomplete } = require('./commands/setup_time');
        await handleAutocomplete(interaction);
      } else if (commandName === 'stop') {
        const { handleAutocomplete } = require('./commands/stop');
        await handleAutocomplete(interaction);
      } else if (commandName === 'remove_event') {
        const { handleAutocomplete } = require('./commands/remove_event');
        await handleAutocomplete(interaction);
      } else if (commandName === 'gif') {
        const { handleAutocomplete } = require('./commands/gif');
        await handleAutocomplete(interaction);
      }
    } catch (error) {
      console.error(`Error in autocomplete for ${commandName}:`, error);
    }
    return;
  }

  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  try {
    if (commandName === 'help') {
      const { handleHelp } = require('./commands/help');
      await handleHelp(interaction);
    } else if (commandName === 'setup_time') {
      const { handleSetupTime } = require('./commands/setup_time');
      await handleSetupTime(interaction);
    } else if (commandName === 'list') {
      const { handleList } = require('./commands/list');
      await handleList(interaction);
    } else if (commandName === 'stop') {
      const { handleStop } = require('./commands/stop');
      await handleStop(interaction);
    } else if (commandName === 'add_event') {
      const { handleAddEvent } = require('./commands/add_event');
      await handleAddEvent(interaction);
    } else if (commandName === 'remove_event') {
      const { handleRemoveEvent } = require('./commands/remove_event');
      await handleRemoveEvent(interaction);
    } else if (commandName === 'language') {
      const { handleLanguage } = require('./commands/language');
      await handleLanguage(interaction);
    } else if (commandName === 'setup_bear_series') {
      const { handleSetupBearSeries } = require('./commands/setup_bear_series');
      await handleSetupBearSeries(interaction);
    } else if (commandName === 'countdown') {
      const { handleCountdown } = require('./commands/countdown');
      await handleCountdown(interaction);
    } else if (commandName === 'gif') {
      const { handleGif } = require('./commands/gif');
      await handleGif(interaction);
    }
  } catch (error) {
    console.error(`Error executing ${commandName}:`, error);
    const errorMessage = '❌ There was an error executing this command!';

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: errorMessage, ephemeral: true });
    } else {
      await interaction.reply({ content: errorMessage, ephemeral: true });
    }
  }
});

// Error handling
client.on('error', error => {
  console.error('❌ Discord client error:', error);
});

process.on('unhandledRejection', error => {
  console.error('❌ Unhandled promise rejection:', error);
});

// Login to Discord
client.login(process.env.DISCORD_TOKEN);
