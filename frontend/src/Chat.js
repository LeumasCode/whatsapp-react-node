import { useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import instance from "./axios";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import React from "react";
import "./Chat.css";

const Chat = ({ messages }) => {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
  await  instance.post("/messages/new", {
      message: input,
      name: "sam",
      timestamp: "Just Now",
      received: false,
    });

    setInput('')
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src="" />
        <div className="chat__headerInfo">
          <h3>Room name</h3>
          <p>last seen at ...</p>
        </div>

        <div className="chatHeaderRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${message.received && "chat__received"}`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">{message.timestamp}</span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <InsertEmoticon />

        <form>
          <input
            value={input}
            type="text"
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage}>Send a message</button>
        </form>

        <Mic />
      </div>
    </div>
  );
};

export default Chat;
