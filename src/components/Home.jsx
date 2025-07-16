import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const generateRoomId = () => {
    const id = "MEET-" + Math.floor(1000 + Math.random() * 9000);
    navigate(`/room/${id}`);
  };

  const joinRoom = () => {
    if (roomId.trim()) navigate(`/room/${roomId}`);
  };

  return (
    <div className="home">
      <h2>Video Call App</h2>
      <button onClick={generateRoomId}>Generate New Call Link</button>
      <input
        type="text"
        placeholder="Enter Room ID"
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button onClick={joinRoom}>Join Room</button>
    </div>
  );
};

export default Home;
