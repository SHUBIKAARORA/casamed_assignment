import express from "express";
import {
  sendMessage,
  getChatBySession,
} from "../controllers/chatController.js";

const router = express.Router();

router.post("/", sendMessage);
router.get("/:sessionId", getChatBySession);

export default router;