import { Router } from "express";
import type { Request, Response } from "express";
import { db } from "./db.js";

const router = Router();

// Create
router.post("/", (req: Request, res: Response) => {
  const { name, score } = req.body;

  if (!name) {
    return res.status(400).json({ error: "name is required" });
  }

  const result = db.prepare(`
    INSERT INTO users (user_name, score, createdAt)
    VALUES (?, ?, ?)
  `).run(name, score, new Date().toISOString());

  console.log('Created user');

  res.status(201).json({
    id: result.lastInsertRowid,
    name,
    score
  });
});

// List with filter
router.get("/", (req: Request, res: Response) => {
  const { name, score } = req.query;

  let query = "SELECT * FROM users";
  const conditions: string[] = [];
  const params: unknown[] = [];

  if (name != null) {
    conditions.push("user_name LIKE ?");
    params.push(`%${name}%`);
  }

  if (score != null) {
    conditions.push("score = ?");
    params.push(Number(score));
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  const rows = db.prepare(query).all(...params);

  res.json(rows);
});

// Get by ID
router.get("/:id", (req: Request, res: Response) => {
  const row = db
    .prepare("SELECT * FROM users WHERE user_id = ?")
    .get(req.params.id);

  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(row);
});

// Update
router.put("/:id", (req: Request, res: Response) => {
  const { name, description } = req.body;

  const result = db.prepare(`
    UPDATE users
    SET name = ?, score = ?
    WHERE user_id = ?
  `).run(name, description, req.params.id);

  if (result.changes === 0)
    return res.status(404).json({ error: "Not found" });

  console.log('Updated user');

  res.json({ success: true });
});

// Delete
router.delete("/:id", (req: Request, res: Response) => {
  const result = db
    .prepare("DELETE FROM users WHERE user_id = ?")
    .run(req.params.id);

  if (result.changes === 0)
    return res.status(404).json({ error: "Not found" });

  console.log('Deleted user');

  res.status(204).send();
});

export default router;
