import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session",
    required: true
  },
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true
  },
  content: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;