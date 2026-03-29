import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Reschedule from "./pages/Reschedule";
import PainGraph from "./pages/PainGraph";
import CreateSession from "./pages/CreateSession";
import PainScore from "./pages/PainScore";
import Confirm from "./pages/Confirm";




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat/:sessionId" element={<Chat />} />
        <Route path="/pain-score" element={<PainScore />} />
        <Route path="/confirm/:sessionId" element={<Confirm />} />
        <Route path="/create-session" element={<CreateSession />} />
        <Route path="/pain-graph/:patientId" element={<PainGraph />} />
        <Route path="/reschedule/:sessionId" element={<Reschedule />} />
      </Routes>
    </Router>
  );
}

export default App;