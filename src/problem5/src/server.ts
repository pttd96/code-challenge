import express from "express";

import userRoutes from "./controller/user.controller.js";
import authenticateRouter from "./controller/authentication.controller.js";
import jwtMiddleware from "./middleware/jwt.middleware.js";

const app = express();
app.use(express.json());


app.use("/login", authenticateRouter);
app.use("/users", jwtMiddleware, userRoutes);

const PORT = 3000;
const IP = "localhost";
app.listen(PORT, IP, () => {
  console.log(`Server running at http://${IP}:${PORT}`);
});
