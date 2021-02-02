import { useEffect } from "react";
import Pusher from 'pusher-js'
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";

function App() {

useEffect(() => {
  // Enable pusher logging - don't include this in production


  var pusher = new Pusher("f0cfbf8551983c35ad8f", {
    cluster: "eu",
  });

  var channel = pusher.subscribe("messages");
  channel.bind("inserted", function (data) {
    alert(JSON.stringify(data));
  });
}, [])

  return (
    <div className="app">
      <div className="app__body">
        {/* sidebar component */}

        <Sidebar />

        {/* chat component */}

        <Chat />
      </div>
    </div>
  );
}

export default App;
