import { Database } from "better-sqlite3"

export const CREATE_DEFAULT_DB_TABLES = (db: Database) => {
  // creating default tables
  db.prepare('CREATE TABLE IF NOT EXISTS employees (id INTEGER PRIMARY KEY, name TEXT, email TEXT, phone TEXT, dept TEXT)').run()
  db.prepare('CREATE TABLE IF NOT EXISTS attendance (id INTEGER PRIMARY KEY, name TEXT, email TEXT, dept TEXT, datetime TEXT)').run()
  db.prepare('CREATE TABLE IF NOT EXISTS auth (id INTEGER PRIMARY KEY, password TEXT)').run()
}
