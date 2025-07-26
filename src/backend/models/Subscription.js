// src/backend/models/Subscription.js
import mongoose from "mongoose";

const subSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: Number,
  paidAt: Date,
  paymentId: String,
});

export default mongoose.models.Subscription || mongoose.model("Subscription", subSchema);
