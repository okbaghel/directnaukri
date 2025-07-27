// backend/models/Feedback.js
import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
  wantIncrease: { type: String, required: true },
  hiredFromPlatform: { type: String, required: true }, // <- fix here
  hrDetails: { type: String, required: true },
  yourDetails: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Feedback || mongoose.model('Feedback', FeedbackSchema);
