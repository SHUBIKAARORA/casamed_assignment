import { useEffect, useState } from "react";
import API from "../api/axios";
import { getUser, logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

function Dashboard() {
  const [sessions, setSessions] = useState([]);
  const [filter, setFilter] = useState("all");

  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await API.get("/sessions");

        const filtered = res.data.filter(
          (s) => s.therapistName === user.name
        );

        setSessions(filtered);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSessions();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const filteredSessions =
    filter === "all"
      ? sessions
      : sessions.filter((s) => s.status === filter);

  return (
    <div className="dashboard-container">

      {/* HEADER */}
      <div className="header">
        <h2>Therapist Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <h3 className="welcome">Welcome, {user.name}</h3>

    
      <div className="filter">
        <label>Filter by Status</label>
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="scheduled">Scheduled</option>
          <option value="confirmed">Confirmed</option>
          <option value="rescheduled">Rescheduled</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* SESSIONS */}
      <div className="sessions">
  {filteredSessions.map((session) => (
    
    <div
      key={session._id}
      className="session-card clickable"
      onClick={() =>
        navigate(`/pain-graph/${session.patientId._id}`, {
          state: { patientName: session.patientName },
        })
      }
    >
      <h4>{session.patientName}</h4>

      {/* NEW: CONTACT */}
      <p><strong>Contact:</strong> {session.phoneNumber || "N/A"}</p>

      <p><strong>Type:</strong> {session.sessionType}</p>

      <p>
        <strong>Date:</strong>{" "}
        {new Date(session.sessionDateTime).toLocaleString()}
      </p>

      {/* STATUS */}
      <p className={`status ${session.status}`}>
        {session.status}
      </p>

      {/* REMINDER */}
      <p className={`reminder ${session.reminderStatus}`}>
        Reminder: {session.reminderStatus}
      </p>

    </div>
  ))}
</div>
    </div>
  );
}

export default Dashboard;