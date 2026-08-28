const { pool } = require('./database');

// Get user's language preference
async function getUserLanguage(guildId, userId, discordLocale) {
  try {
    const result = await pool.query(
      'SELECT language FROM user_preferences WHERE guild_id = $1 AND user_id = $2',
      [guildId, userId]
    );

    if (result.rows.length > 0) {
      return result.rows[0].language;
    }

    // Use Discord locale or default
    const { mapDiscordLocale } = require('./i18n');
    return mapDiscordLocale(discordLocale);
  } catch (error) {
    console.error('Error getting user language:', error);
    return 'en-US';
  }
}

// Set user's language preference
async function setUserLanguage(guildId, userId, language) {
  try {
    await pool.query(`
      INSERT INTO user_preferences (guild_id, user_id, language, updated_at)
      VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
      ON CONFLICT (guild_id, user_id)
      DO UPDATE SET language = EXCLUDED.language, updated_at = CURRENT_TIMESTAMP
    `, [guildId, userId, language]);

    return true;
  } catch (error) {
    console.error('Error setting user language:', error);
    return false;
  }
}

module.exports = {
  getUserLanguage,
  setUserLanguage
};
