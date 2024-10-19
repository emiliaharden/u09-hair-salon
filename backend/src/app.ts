import cors from "cors";
import express, { Express, Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import scheduleRoutes from "./routes/scheduleRoutes";
import serviceRoutes from "./routes/serviceRouter";
import connectDB from "./config/db";

const app: Express = express();

const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? "https://u09-hair-salon.netlify.app" // Produktions-URL
      : "http://localhost:5173", // Utvecklings-URL
  methods: ["GET", "POST", "PUT", "DELETE"], // Tillåtna metoder
  credentials: true, // Tillåt cookies och andra credentials
};
console.log(`CORS origin set to: ${corsOptions.origin}`);
app.use(cors(corsOptions));

app.use(express.json()); // Middleware för att parsa JSON

// Logga alla inkommande förfrågningar för felsökning
// app.use((req, res, next) => {
//   console.log(`Request received at ${req.path}`);
//   console.log(`Method: ${req.method}`);
//   console.log(`Headers: ${JSON.stringify(req.headers)}`);
//   next();
// });

// Anslut till databasen
connectDB();

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", bookingRoutes);
app.use("/api", scheduleRoutes);
app.use("/api", serviceRoutes);

export default app;
