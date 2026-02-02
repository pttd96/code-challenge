import express from "express";
import userRoutes from "./user.routes.js";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);

const PORT = 3000;
const IP = "localhost";
app.listen(PORT, IP, () => {
  console.log(`Server running at http://${IP}:${PORT}`);
});
