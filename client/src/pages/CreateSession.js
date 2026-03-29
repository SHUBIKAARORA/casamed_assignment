import { useEffect, useState } from "react";
import API from "../api/axios";

function CreateSession() {
  const [patients, setPatients] = useState([]);
  const [therapists, setTherapists] = useState([]);

  const [formData, setFormData] = useState({
    patientName: "",
    phoneNumber: "",
    sessionType: "",
    sessionDateTime: "",
    therapistName: "",
  });

  // Fetch patients + therapists
  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientRes = await API.get("/users/patients");
        const therapistRes = await API.get("/users/therapists");

        setPatients(patientRes.data);
        setTherapists(therapistRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // Patient select
  const handlePatientChange = (e) => {
    const selected = patients.find((p) => p._id === e.target.value);

    setFormData({
      ...formData,
      patientName: selected.name,
      phoneNumber: selected.phoneNumber || "",
    });
  };

  // Therapist select
  const handleTherapistChange = (e) => {
    const selected = therapists.find((t) => t._id === e.target.value);

    setFormData({
      ...formData,
      therapistName: selected.name,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/sessions", formData);
      alert("Session created!");
      console.log(res.data);

      setFormData({
        patientName: "",
        phoneNumber: "",
        sessionType: "",
        sessionDateTime: "",
        therapistName: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error creating session");
    }
  };

  return (
    <div>
      <h2>Create Session</h2>

      <form onSubmit={handleSubmit}>

        {/* PATIENT */}
        <div>
          <label>Select Patient:</label><br />
          <select onChange={handlePatientChange}>
            <option value="">-- Select Patient --</option>
            {patients.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <br />

        {/* THERAPIST */}
        <div>
          <label>Select Therapist:</label><br />
          <select onChange={handleTherapistChange}>
            <option value="">-- Select Therapist --</option>
            {therapists.map((t) => (
              <option key={t._id} value={t._id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        <br />

        {/* PHONE */}
        <div>
          <label>Phone Number:</label><br />
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Session Type:</label><br />
          <input
            type="text"
            name="sessionType"
            value={formData.sessionType}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Date & Time:</label><br />
          <input
            type="datetime-local"
            name="sessionDateTime"
            value={formData.sessionDateTime}
            onChange={handleChange}
          />
        </div>

        <br />
        <button type="submit">Create Session</button>
      </form>
    </div>
  );
}

export default CreateSession;