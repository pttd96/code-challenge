import Database from "better-sqlite3";
import type { User } from "../model/user.model.js";

class UserRepository {
  private db: Database.Database;  

  constructor(dbPath: string = "data.db") {
    this.db = new Database(dbPath);
    this.initializeTable();
  }

  private initializeTable(): void {
    this.db.prepare(`
      CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_name TEXT NOT NULL,
        score INTEGER,
        createdAt TEXT NOT NULL
      )
    `).run();
  }

  createUser(name: string, score: number): User {
    const createdAt = new Date().toISOString();
    const result = this.db.prepare(`
      INSERT INTO users (user_name, score, createdAt)
      VALUES (?, ?, ?)
    `).run(name, score, createdAt);

    return {
      user_id: result.lastInsertRowid as number,
      user_name: name,
      score: score,
      createdAt: createdAt
    } as User;
  }


  getUserById(id: number): User | undefined {
    return this.db.prepare(`
      SELECT user_id, user_name, score, createdAt 
      FROM users 
      WHERE user_id = ?
    `).get(id) as User | undefined;
  }

  getAll(limit?: number, user_name?: string, score?: number): User[] {
    let query = `SELECT * FROM users`;
    const params: any[] = [];

    // Add WHERE conditions
    const conditions: string[] = [];
    if (user_name !== null && user_name !== undefined) {
      conditions.push(`user_name = ?`);
      params.push(user_name);
    }
    if (score !== null && score !== undefined) {
      conditions.push(`score = ?`);
      params.push(score);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }

    if (limit) {
      query += ` LIMIT ?`;
      params.push(limit);
    }

    const stmt = this.db.prepare(query);
    return stmt.all(...params) as User[];
  }

  updateUser(id: number, name?: string, score?: number): boolean {
    if (name && score) {
      const result = this.db.prepare(`
        UPDATE users 
        SET user_name = ?, score = ? 
        WHERE user_id = ?
      `).run(name, score, id);
      return result.changes > 0;
    }
    return false;
  }

  deleteUser(id: number): boolean {
    const result = this.db.prepare(`
      DELETE FROM users 
      WHERE user_id = ?
    `).run(id);
    return result.changes > 0;
  }

  close(): void {
    this.db.close();
  }
}

export const userRepository = new UserRepository();