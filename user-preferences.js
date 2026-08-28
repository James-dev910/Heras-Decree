const fs = require('fs');
const path = require('path');

const USER_PREFERENCES_FILE = path.join(__dirname, 'user-preferences.json');

// Load user preferences from file
function loadUserPreferences() {
  try {
    if (fs.existsSync(USER_PREFERENCES_FILE)) {
      const data = fs.readFileSync(USER_PREFERENCES_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading user preferences:', error);
  }
  return {};
}

// Save user preferences to file
function saveUserPreferences(preferences) {
  try {
    fs.writeFileSync(USER_PREFERENCES_FILE, JSON.stringify(preferences, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving user preferences:', error);
  }
}

// Get user's language preference
// Priority: Custom setting > Discord locale > Default (en-US)
function getUserLanguage(guildId, userId, discordLocale) {
  const preferences = loadUserPreferences();

  // Check if user has custom language setting for this guild
  if (preferences[guildId] && preferences[guildId][userId]) {
    return preferences[guildId][userId].language;
  }

  // Otherwise use Discord locale or default
  const { mapDiscordLocale } = require('./i18n');
  return mapDiscordLocale(discordLocale);
}

// Set user's language preference
function setUserLanguage(guildId, userId, language) {
  const preferences = loadUserPreferences();

  if (!preferences[guildId]) {
    preferences[guildId] = {};
  }

  preferences[guildId][userId] = {
    language: language,
    updatedAt: new Date().toISOString()
  };

  saveUserPreferences(preferences);
  return true;
}

// Get guild's default language (from first user who set schedule)
function getGuildLanguage(guildId) {
  const preferences = loadUserPreferences();

  if (preferences[guildId]) {
    // Get the first user's language as guild default
    const users = Object.values(preferences[guildId]);
    if (users.length > 0) {
      return users[0].language;
    }
  }

  return 'en-US'; // Default to English
}

module.exports = {
  getUserLanguage,
  setUserLanguage,
  getGuildLanguage
};
