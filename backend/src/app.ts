import express, { Express, Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import connectDB from "./config/db";

const app: Express = express();

app.use(express.json());

connectDB();

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api", userRoutes);

export default app;
