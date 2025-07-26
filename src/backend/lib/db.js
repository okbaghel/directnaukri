// src/backend/db.js
import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Jobapp",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(" MongoDB Connected");
  } catch (err) {
    console.error(" DB Connection Error:", err);
    throw err;
  }
};
