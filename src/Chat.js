import React, { useState, useEffect } from "react";
import connection from "./signalr";
import "./Chat.css"; // для стилів

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [user] = useState("User" + Math.floor(Math.random() * 100));

  useEffect(() => {
    connection.on("ReceiveMessage", (user, message, sentiment) => {
      setMessages((prev) => [...prev, { user, message, sentiment }]);
    });

    return () => {
      connection.off("ReceiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      connection
        .invoke("SendMessage", user, message)
        .catch((err) => console.error("Error sending message:", err));
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const getMessageClass = (sentiment) => {
    switch (sentiment) {
      case "positive":
        return "message positive";
      case "negative":
        return "message negative";
      case "neutral":
        return "message neutral";
      default:
        return "message";
    }
  };

  return (
    <div className="chat-container">
      <h2>Real-time Chat</h2>
      <div className="chat-window">
        {messages.map((msg, i) => (
          <div key={i} className={getMessageClass(msg.sentiment)}>
            <strong>{msg.user}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
