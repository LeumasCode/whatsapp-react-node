import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";

function App() {
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
