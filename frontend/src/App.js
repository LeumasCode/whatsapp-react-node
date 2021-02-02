import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import instance from "./axios";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await instance.get("/messages");

      setMessages(data);
    };
    fetchMessages();
  }, []);

  useEffect(() => {
    // Enable pusher logging - don't include this in production

    let pusher = new Pusher("f0cfbf8551983c35ad8f", {
      cluster: "eu",
    });

    let channel = pusher.subscribe("messages");
    channel.bind("inserted", function (data) {
      setMessages([...messages, data]);
    });

    return () => {
      channel.unbind();
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <div className="app">
      {console.log(messages)}
      <div className="app__body">
        {/* sidebar component */}

        <Sidebar />

        {/* chat component */}

        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
