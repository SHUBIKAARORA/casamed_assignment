import Session from "../models/Session.js";
import ReminderLog from "../models/ReminderLog.js";
import { sendWhatsAppMessage } from "../lib/Whatsapp.js";

export const confirmSession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await Session.findById(sessionId);
    if (!session) return res.status(404).json({ message: "Session not found" });

    session.status = "confirmed";
    await session.save();

    res.json({ message: "Session confirmed successfully", session });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const rescheduleSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { newDateTime } = req.body;

    const session = await Session.findById(sessionId);
    if (!session) return res.status(404).json({ message: "Session not found" });

    session.sessionDateTime = newDateTime;
    session.status = "rescheduled";
    session.reminderStatus = "pending";
    await session.save();

    res.json({ message: "Session rescheduled successfully", session });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const triggerReminders = async (req, res) => {
  try {
    const now = new Date();

    const sessions = await Session.find({
      reminderStatus: { $ne: "done" },
    });

    const updates = [];
    const errors = [];

    for (const session of sessions) {
      const sessionTime = new Date(session.sessionDateTime);
      const diffHours = (sessionTime - now) / (1000 * 60 * 60);

      if (diffHours <= 24 && diffHours > 23) {
        const alreadySent = await ReminderLog.findOne({
          sessionId: session._id,
          type: "24h",
        });

        if (!alreadySent) {
          const message =
            `Hello ${session.clientName}, your CasaMed physiotherapy session with ` +
            `${session.therapistName} is scheduled for ${formatDateTime(session.sessionDateTime)}. ` +
            `See you then! — CasaMed Team`;

          try {
            await sendWhatsAppMessage(session.phoneNumber, message);

            await ReminderLog.create({
              sessionId: session._id,
              type: "24h",
              status: "sent",
              message,
              sentAt: new Date(),
            });

            session.reminderStatus = "sent_24h";
            await session.save();

            updates.push({ id: session._id, type: "24h" });
          } catch (whatsappError) {
            console.error(`❌ 24h reminder failed for session ${session._id}:`, whatsappError.message);

            await ReminderLog.create({
              sessionId: session._id,
              type: "24h",
              status: "failed",
              message,
              error: whatsappError.message,
              sentAt: new Date(),
            });

            errors.push({ id: session._id, type: "24h", error: whatsappError.message });
          }
        }
      }

      else if (diffHours <= 1 && diffHours > 0) {
        const alreadySent = await ReminderLog.findOne({
          sessionId: session._id,
          type: "1h",
        });

        if (!alreadySent) {
          const baseUrl = process.env.APP_BASE_URL || "http://localhost:3000";
          const message =
            `Your session with ${session.therapistName} starts in 1 hour ` +
            `at ${formatDateTime(session.sessionDateTime)}.\n\n` +
            `Confirm: ${baseUrl}/confirm/${session._id}` +
            ` Reschedule: ${baseUrl}/reschedule/${session._id}`;

          try {
            await sendWhatsAppMessage(session.phoneNumber, message);

            await ReminderLog.create({
              sessionId: session._id,
              type: "1h",
              status: "sent",
              message,
              sentAt: new Date(),
            });

            session.reminderStatus = "sent_1h";
            await session.save();

            updates.push({ id: session._id, type: "1h" });
          } catch (whatsappError) {
            console.error(`❌ 1h reminder failed for session ${session._id}:`, whatsappError.message);

            await ReminderLog.create({
              sessionId: session._id,
              type: "1h",
              status: "failed",
              message,
              error: whatsappError.message,
              sentAt: new Date(),
            });

            errors.push({ id: session._id, type: "1h", error: whatsappError.message });
          }
        }
      }

      else if (diffHours <= 0) {
        session.reminderStatus = "done";
        await session.save();
      }
    }

    res.json({
      message: "Reminders processed successfully",
      sent: updates,
      failed: errors,
    });
  } catch (error) {
    console.error("Reminder Error:", error);
    res.status(500).json({ message: error.message });
  }
};

const formatDateTime = (dt) =>
  new Date(dt).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });