import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";

const socket = io.connect("http://localhost:8080");
function App() {
  const [room, setRoom] = useState();
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState("");
  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };
  useEffect(() => {
    socket.on("received message", (data) => {
      setMessageList(data.message);
      setMessage("");
    });
  }, []);
  return (
    <div className="App">
      <div>
        <input
          type="number"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Type Here..."
        />
        <button onClick={joinRoom}>Join Room</button>
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type Here..."
      />
      <button onClick={sendMessage}>Send Message</button>
      <h2>{messageList}</h2>
    </div>
  );
}

export default App;
