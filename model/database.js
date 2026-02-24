const Database = require('better-sqlite3');

// Initialize database with WAL mode for better performance
const db = new Database('choices.db', { 
  verbose: null // Optional: logs SQL queries
});

// Enable foreign keys and WAL journal mode
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Create table if not exists
db.prepare(`
  CREATE TABLE IF NOT EXISTS user_choices (
    user_id TEXT PRIMARY KEY,
    username TEXT,  -- New column
    choice TEXT NOT NULL CHECK (choice IN ('A', 'B')),
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

// Add username column if it doesn't exist (for backward compatibility)
try {
  db.prepare('ALTER TABLE user_choices ADD COLUMN username TEXT').run();
} catch (e) {
  // Column already exists - do nothing
}

// Prepare statements for reuse
const statements = {
  upsert: db.prepare(`
    INSERT INTO user_choices (user_id, username, choice)
    VALUES (@user_id, @username, @choice)
    ON CONFLICT(user_id) DO UPDATE SET
      username = excluded.username,
      choice = excluded.choice,
      timestamp = CURRENT_TIMESTAMP
  `),
  getAll: db.prepare(`
    SELECT user_id, username, choice, timestamp 
    FROM user_choices 
    ORDER BY timestamp DESC
  `)
};

module.exports = { db, statements };