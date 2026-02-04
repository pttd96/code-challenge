import { Router } from "express";
import type { Request, Response } from "express";
import { userService } from "../service/user.service.js";
import jwtMiddleware from "../middleware/jwt.middleware.js";
import jwt from "jsonwebtoken";

const authenticateRouter = Router();
const JWT_SECRET = "johnny";

// Login endpoint to generate JWT token (no auth required)
authenticateRouter.get("/", (req: Request, res: Response) => {
    const token = jwt.sign({ userId: 69, username: "testuser" }, JWT_SECRET);
    return res.json({ jwtToken: token });
});

export default authenticateRouter;