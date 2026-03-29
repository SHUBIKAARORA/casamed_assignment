import mongoose from "mongoose";

const reminderLogSchema = new mongoose.Schema({
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session",
    required: true
  },
  type: {
    type: String,
    enum: ["24h", "1h"],
    required: true
  },
  status: {
    type: String,
    enum: ["sent", "failed"],
    default: "sent"
  },
  message: String,
  sentAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.model("ReminderLog", reminderLogSchema);