require('dotenv').config();
const { REST, Routes } = require('discord.js');

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('🔄 Fetching all global commands...');

    // Get all global commands
    const commands = await rest.get(
      Routes.applicationCommands(process.env.CLIENT_ID)
    );

    console.log(`📋 Found ${commands.length} global commands`);

    if (commands.length === 0) {
      console.log('✅ No global commands to delete');
      return;
    }

    // Delete all global commands
    console.log('🗑️ Deleting all global commands...');
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: [] }
    );

    console.log('✅ All global commands deleted successfully!');
    console.log('💡 Your guild-specific commands are unaffected');
    console.log('💡 Restart Discord client to see changes immediately');
  } catch (error) {
    console.error('❌ Error:', error);
  }
})();
