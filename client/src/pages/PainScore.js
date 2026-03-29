import { useState } from "react";
import API from "../api/axios";
import "../styles/pain.css";

function PainScore() {
  const [patientId, setPatientId] = useState("");
  const [score, setScore] = useState(5);
  const [note, setNote] = useState("");

  const getPainLabel = () => {
    if (score <= 3) return "Mild 😌";
    if (score <= 6) return "Moderate 😐";
    return "Severe 😣";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!patientId.trim()) {
      alert("Please enter Patient ID");
      return;
    }

    try {
      const res = await API.post("/pain-score", {
        patientId,
        score: Number(score),
        note,
      });

      alert("Pain score submitted!");
      console.log("Saved Entry:", res.data);

      // reset
      setPatientId("");
      setScore(5);
      setNote("");
    } catch (err) {
      console.error(err);
      alert("Error submitting score");
    }
  };

  return (
    <div className="pain-container">
      <h2>Pain Tracker</h2>
      <p className="subtitle">Log pain score for a patient</p>

      <form onSubmit={handleSubmit} className="pain-form">

        {/* PATIENT ID INPUT */}
        <input
          type="text"
          placeholder="Enter Patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          className="patient-input"
        />

        {/* SCORE DISPLAY */}
        <div className="score-display">
          <span className="score">{score}</span>
          <span className="label">{getPainLabel()}</span>
        </div>

        {/* SLIDER */}
        <input
          type="range"
          min="0"
          max="10"
          value={score}
          className="slider"
          onChange={(e) => setScore(Number(e.target.value))}
        />

        <div className="scale">
          <span>0</span>
          <span>10</span>
        </div>

        {/* NOTE */}
        <textarea
          placeholder="Add a note (e.g. after workout, sitting long hours...)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        {/* BUTTON */}
        <button type="submit">Save Entry</button>
      </form>
    </div>
  );
}

export default PainScore;