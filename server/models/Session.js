import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  patientName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  sessionType: {
    type: String,
    required: true
  },
  sessionDateTime: {
    type: Date,
    required: true
  },
  therapistName: {
    type: String,
    required: true
  },
  reminderStatus: {
    type: String,
    enum: ["pending", "sent_24h", "sent_1h", "done"],
    default: "pending"
  },
  status: {
  type: String,
  enum: ["scheduled", "confirmed", "rescheduled", "completed"],
  default: "scheduled"
}
}, { timestamps: true });

export default mongoose.model("Session", sessionSchema);