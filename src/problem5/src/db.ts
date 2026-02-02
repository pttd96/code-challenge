import Database from "better-sqlite3";

const db: Database.Database = new Database("data.db");

db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name TEXT NOT NULL,
    score INTEGER,
    createdAt TEXT NOT NULL
  )
`).run();

export { db };
