import db from "../config/firebase.js";

//  Add pain score
export const addPainScore = async (req, res) => {
  try {
    const { patientId, score, note } = req.body;

    // Validation
    if (!patientId || score === undefined) {
      return res.status(400).json({ message: "patientId and score are required" });
    }

    if (score < 0 || score > 10) {
      return res.status(400).json({ message: "Score must be between 0 and 10" });
    }

    // Create new document
    const painRef = db.collection("painScores").doc();

    const data = {
      entryId: painRef.id,
      patientId,
      score,
      note: note || "",
      recordedAt: new Date(),
    };

    await painRef.set(data);

    res.status(201).json(data);
  } catch (error) {
    console.error("Pain Score Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get pain scores for a patient
export const getPainScores = async (req, res) => {
  try {
    const { patientId } = req.params;

    const snapshot = await db
      .collection("painScores")
      .where("patientId", "==", patientId)
      .orderBy("recordedAt", "desc")
      .get();

    const scores = snapshot.docs.map(doc => {
  const data = doc.data();

  return {
    ...data,
    recordedAt: data.recordedAt.toDate(), // 🔥 KEY FIX
  };
});

    res.json(scores);
  } catch (error) {
    console.error("Fetch Pain Scores Error:", error);
    res.status(500).json({ message: error.message });
  }
};