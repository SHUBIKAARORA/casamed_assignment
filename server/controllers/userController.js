import User from "../models/User.js";

export const getAllPatients = async (req, res) => {
  try {
    const patients = await User.find({ role: "patient" }).select("name email");
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllTherapists = async (req, res) => {
  try {
    const therapists = await User.find({ role: "therapist" }).select("name email");
    res.json(therapists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};