const { Pool } = require('pg');

// Create PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.POSTGRES_CONNECTION_STRING,
  ssl: false  // Zeabur PostgreSQL doesn't require SSL for internal connections
});

// Initialize database tables
async function initializeDatabase() {
  const client = await pool.connect();

  try {
    // Create schedules table
    await client.query(`
      CREATE TABLE IF NOT EXISTS schedules (
        id SERIAL PRIMARY KEY,
        guild_id VARCHAR(255) NOT NULL,
        event_name VARCHAR(255) NOT NULL,
        event_time TIMESTAMP NOT NULL,
        channel_id VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL,
        last_notified TIMESTAMP,
        created_by VARCHAR(255),
        language VARCHAR(10),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(guild_id, event_name)
      )
    `);

    // Create custom_events table
    await client.query(`
      CREATE TABLE IF NOT EXISTS custom_events (
        id SERIAL PRIMARY KEY,
        guild_id VARCHAR(255) NOT NULL,
        event_name VARCHAR(255) NOT NULL,
        emoji VARCHAR(50) NOT NULL,
        type VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(guild_id, event_name)
      )
    `);

    // Create user_preferences table
    await client.query(`
      CREATE TABLE IF NOT EXISTS user_preferences (
        id SERIAL PRIMARY KEY,
        guild_id VARCHAR(255) NOT NULL,
        user_id VARCHAR(255) NOT NULL,
        language VARCHAR(10) NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(guild_id, user_id)
      )
    `);

    console.log('✅ Database tables initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Test database connection
async function testConnection() {
  try {
    const client = await pool.connect();
    await client.query('SELECT NOW()');
    client.release();
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

module.exports = {
  pool,
  initializeDatabase,
  testConnection
};
