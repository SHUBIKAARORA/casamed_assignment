import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

function Reschedule() {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const [dateTime, setDateTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dateTime) {
      alert("Please select date and time");
      return;
    }

    try {
      await API.post(`/reminders/reschedule/${sessionId}`, {
        newDateTime: dateTime,
      });

      alert("Session rescheduled successfully!");

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Error rescheduling session");
    }
  };

  return (
    <div style={{ width: "400px", margin: "100px auto", textAlign: "center" }}>
      <h2>Reschedule Session</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          required
        />

        <br /><br />

        <button type="submit">Reschedule</button>
      </form>
    </div>
  );
}

export default Reschedule;