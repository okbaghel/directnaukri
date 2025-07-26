// src/backend/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  otp: String,
  isVerified: { type: Boolean, default: false },
  subscription: {
    isActive: { type: Boolean, default: false },
    purchasedAt: Date,
  },
  subscriptionExpiresAt: Date,
  isPaid: { type: Boolean, default: false },
  subscribed: {
  type: Boolean,
  default: false,
}
},{ timestamps: true});

export default mongoose.models.User || mongoose.model("User", userSchema);
