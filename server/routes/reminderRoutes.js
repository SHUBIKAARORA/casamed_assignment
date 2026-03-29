import express from "express";
import {triggerReminders,confirmSession,rescheduleSession} from "../controllers/reminderController.js";

const router = express.Router();

router.post("/trigger", triggerReminders);
router.get("/confirm/:sessionId", confirmSession);
router.post("/reschedule/:sessionId", rescheduleSession);

export default router;