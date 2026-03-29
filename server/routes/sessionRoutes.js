import express from "express";
import {
  createSession,
  getAllSessions,
  getSessionById
} from "../controllers/sessionController.js";

const router = express.Router();

router.post("/", createSession);
router.get("/", getAllSessions);
router.get("/:id", getSessionById);

export default router;