import mongoose from "mongoose";
import dotenv from "dotenv";

const connectDB = async () => {
  const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
  dotenv.config({ path: envFile });

  try {
    const dbUri = process.env.MONGO_URI;
    console.log("Connecting to MongoDB with URI:", dbUri);
    await mongoose.connect(dbUri as string);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    if (process.env.NODE_ENV !== "test") {
      process.exit(1);
    } else {
      throw new Error("MongoDB connection failed in test enviroment");
    }
  }
};

export default connectDB;
