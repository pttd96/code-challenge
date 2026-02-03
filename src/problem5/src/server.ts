import express from "express";
import userRoutes from "./controller/user.controller.js";
import jwtMiddleware from "./middleware/jwt.middleware.js";

const app = express();
app.use(express.json());

// JWT validation middleware (set JWT_SECRET env var to change secret)
app.use(jwtMiddleware);

app.use("/users", userRoutes);

const PORT = 3000;
const IP = "localhost";
app.listen(PORT, IP, () => {
  console.log(`Server running at http://${IP}:${PORT}`);
});
