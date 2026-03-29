import Session from "../models/Session.js";
import User from "../models/User.js"; // ✅ NEW

// Create session
export const createSession = async (req, res) => {
  try {
    const {
      patientName,
      phoneNumber,
      sessionType,
      sessionDateTime,
      therapistName
    } = req.body;

    // basic validation
    if (
      !patientName ||
      !phoneNumber ||
      !sessionType ||
      !sessionDateTime ||
      !therapistName
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ FIND PATIENT FROM DB
    const patient = await User.findOne({ name: patientName });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const session = await Session.create({
      patientId: patient._id, // ✅ IMPORTANT ADDITION
      patientName,
      phoneNumber,
      sessionType,
      sessionDateTime,
      therapistName,
      reminderStatus: "pending"
    });

    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Get all sessions (Therapist Dashboard)
export const getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find()
      .populate("patientId", "name email") // ✅ NEW
      .sort({ sessionDateTime: 1 });

    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Get single session
export const getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate("patientId", "name email"); // ✅ NEW

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get session by therapist name
export const getSessionsByTherapist = async (req, res) => {
  try {
    const sessions = await Session.find({
      therapistName: req.user.name
    }).populate("patientId", "name email"); // ✅ NEW

    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};