import cors from "cors";
import express, { Express, Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import scheduleRoutes from "./routes/scheduleRoutes";
import serviceRoutes from "./routes/serviceRouter";
import connectDB from "./config/db";

const app: Express = express();

app.use(
  cors({
    origin: "https://u09-hair-salon.netlify.app", // Ta bort avslutande snedstreck
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.json()); // Middleware för att parsa JSON

// Logga alla inkommande förfrågningar för felsökning
app.use((req, res, next) => {
  console.log(`Request received at ${req.path}`);
  console.log(`Method: ${req.method}`);
  console.log(`Headers: ${JSON.stringify(req.headers)}`);
  next();
});

// Anslut till databasen
connectDB();

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/services", serviceRoutes);

export default app;
