import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import React from "react";
import "./Chat.css";

const Chat = () => {
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
        <p className="chat__message">
          <span className="chat__name">Sammy</span>
          This is a message
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p>

        <p className="chat__message chat__receiver">
          <span className="chat__name">Sammy</span>
          This is a message
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p>

     
      </div>

      
    </div>
  );
};

export default Chat;
