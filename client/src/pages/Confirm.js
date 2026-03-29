import { useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

function Confirm() {
  const { sessionId } = useParams();

  useEffect(() => {
    const confirmSession = async () => {
      try {
        await API.get(`/reminders/confirm/${sessionId}`);
      } catch (err) {
        console.error(err);
      }
    };

    confirmSession();
  }, [sessionId]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Session Confirmed</h2>
      <p>Your appointment has been successfully confirmed.</p>
    </div>
  );
}

export default Confirm;