import React, { useState, useEffect, useRef, useContext } from "react";
import socket from "./Utils/Socket";

import "../App.css";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const chatMessageRef = useRef(null);
  const { room_code } = useParams();
  const {userInfo} = useContext(UserContext)

  // const handleInputChange = (event) => {
  //   setInputText(event.target.value);
  // };

  const handleSubmit = (event) => {
    const currentTime = new Date().toLocaleString(undefined, {
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "numeric",
    });
    event.preventDefault();
    socket.emit("frontend_send_message", {
      name: userInfo.username,
      message: inputMessage,
      room: room_code,
    });
    setInputMessage("");
  };

  useEffect(() => {
    chatMessageRef.current.scrollIntoView({ behavior: "smooth" });

    function onMessage(data) {
      if (data.room === room_code || data.room === currentRoom) {
        setMessages((prevMessage) => [
          ...prevMessage,
          `${data.name} : ${data.message}`,
        ]);
      }
    }

    socket.on("send-message", onMessage);
    socket.on("backend_send_message", onMessage);

    return () => {
      socket.off("send-message", onMessage);
      socket.off("backend_send_message", onMessage);
    };
  }, []);

  return (
    <div
      className="chat-window-container"
      style={{ width: "100%", height: "100%" }}
    >
      <div className="chat-window" style={{ width: "100%", height: "100%" }}>
        <div className="chat-message-container">
          {messages.map((message, index) => (
            <div key={index} className="chat-message">
              <div className="chat-message-text">
                <span className="chat-message-sender">{message}</span>
                <span className="chat-message-details">{message.time}</span>
              </div>
            </div>
          ))}
          <div ref={chatMessageRef}></div>
        </div>
        <form className="chat-input-container" onSubmit={handleSubmit}>
          <input
            style={{ width: "100%" }}
            className="chat-input-text"
            type="text"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(event) => setInputMessage(event.target.value)}
          />
          {/* <button className="chat-send-button">
            Send
          </button> */}
        </form>
      </div>
    </div>
  );
}
