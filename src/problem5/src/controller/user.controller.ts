import { Router } from "express";
import type { Request, Response } from "express";
import { userService } from "../service/user.service.js";
import jwtMiddleware from "../middleware/jwt.middleware.js";

const router = Router();

// Create
router.post("/", jwtMiddleware, (req: Request, res: Response) => {
  const { name, score } = req.body;

  if (!name) {
    return res.status(400).json({ error: "name is required" });
  }

  const createdUser = userService.createUser(name, score);
  
  res.status(201).json(createdUser);
});

// List with filter
router.get("/", (req: Request, res: Response) => {
  const { name, score, limit } = req.query;

  const users = userService.getUsers(
    limit ? Number(limit) : undefined,
    name ? String(name) : undefined,
    score ? Number(score) : undefined
  );
  
  res.json(users);
});

// Get by ID
router.get("/:id", (req: Request, res: Response) => {
  const user = userService.getUserById(Number(req.params.id));

  if (!user) return res.status(404).json({ error: "Not found" });
  res.json(user);
});

// Update
router.put("/:id", jwtMiddleware, (req: Request, res: Response) => {
    const { name, score } = req.body;
    const userId = Number(req.params.id);
    const updatedUser = userService.updateUser(userId, name, score);

    if (!updatedUser) {
        return res.status(500).json({ error: "Failed to update user" });
    }

    res.status(200).json({ success: true });
});

// Delete
router.delete("/:id", jwtMiddleware, (req: Request, res: Response) => {
    const userId = Number(req.params.id);
    const userDeleted = userService.deleteUser(userId);

    if (!userDeleted) {
        return res.status(500).json({ error: "Failed to delete user" });
    }

    res.status(200).json({ success: true });
});

export default router;
