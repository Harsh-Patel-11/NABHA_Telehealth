import { useState } from "react";
import { FaUserPlus, FaStethoscope, FaSearch, FaCalendarCheck, FaVideo, FaPrescription, FaRobot, FaPaperPlane } from "react-icons/fa";
import { HTTP } from "../http-common";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I'm your AI health assistant. How can I help you today? You can describe your symptoms or ask about health concerns.",
    },
  ]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("en");

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message to chat
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    // Prepare request payload
    const data = {
      message: input,
      language: language,
    };

    try {
      // Call Laravel API
      const res = await HTTP.post("/chatbot", data);

      // Get reply from API
      const botReply = res.data.chatbot_reply || "⚠️ No response from AI.";

      // Add bot message to chat
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (error) {
      console.error("Chatbot API error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Sorry, something went wrong." },
      ]);
    }
    // Clear input
    setInput("");
  };


  return (
    <>
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="container">
          <h1>Telemedicine access for rural healthcare</h1>
          <p>Simple, fast, local healthcare solutions for the Nabha community through telemedicine technology.</p>
          <a href="#find-doctor" className="btn">Find a Doctor Now</a>
        </div>
      </section>

      {/* Services */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <div className="features-grid">
            <div className="feature-card">
              <FaUserPlus />
              <h3>Patient Registration</h3>
              <p>Create your account, fill out medical history, and get started with telehealth services.</p>
            </div>
            <div className="feature-card">
              <FaStethoscope />
              <h3>Doctor Registration</h3>
              <p>Healthcare providers can join our platform to serve rural communities.</p>
            </div>
            <div className="feature-card">
              <FaSearch />
              <h3>Find Doctor</h3>
              <p>Search for healthcare professionals based on specialty, availability, and language.</p>
            </div>
            <div className="feature-card">
              <FaCalendarCheck />
              <h3>Book Appointments</h3>
              <p>Schedule virtual consultations at your convenience.</p>
            </div>
            <div className="feature-card">
              <FaVideo />
              <h3>Video Consultations</h3>
              <p>Secure, high-quality video calls with healthcare professionals.</p>
            </div>
            <div className="feature-card">
              <FaPrescription />
              <h3>E-Prescriptions</h3>
              <p>Receive electronic prescriptions sent directly to your pharmacy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Section */}
      <section className="chat-section" id="chat">
        <div className="container">
          <h2 className="section-title">AI Medical Assistant</h2>
          <div className="chat-container">
            <div className="chat-header">
              <h3><FaRobot /> Chat with our AI Health Assistant</h3>
              <p>Get preliminary medical advice and translation services</p>
            </div>
            <div className="language-selector">
              <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="en">English</option>
                <option value="es">Español (Spanish)</option>
                <option value="fr">Français (French)</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
              </select>
            </div>
            <div className="chat-messages">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`message ${msg.sender === "bot" ? "bot-message" : "user-message"}`}
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                ></div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }
                }}
                placeholder="Type your message here..."
              />
              <button onClick={handleSend}><FaPaperPlane /> Send</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}