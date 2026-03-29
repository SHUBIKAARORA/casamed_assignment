import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import "../styles/chat.css";

function Chat() {
  const { sessionId } = useParams();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  // Fetch chat history
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await API.get(`/chat/${sessionId}`);

        const formatted = res.data.map((msg) => ({
          sender: msg.role === "user" ? "user" : "ai",
          message: msg.content,
        }));

        setMessages(formatted);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();
  }, [sessionId]);

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      message: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await API.post("/chat", {
        sessionId,
        message: input,
      });

      const aiMessage = {
        sender: "ai",
        message: res.data.aiMessage.content,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="chat-container">
      <h2>AI Therapist</h2>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`msg ${msg.sender === "user" ? "user" : "ai"}`}
          >
            {msg.message}
          </div>
        ))}

        {loading && <div className="msg ai">Typing...</div>}

        <div ref={chatEndRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Chat;