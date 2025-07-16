import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND_URL);

const VideoCall = () => {
  const [roomCode, setRoomCode] = useState("");
  const [joined, setJoined] = useState(false);
  const [inCall, setInCall] = useState(false);
  const [error, setError] = useState("");
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const pcRef = useRef();
  const localStreamRef = useRef();
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);

  useEffect(() => {
    if (!joined) return;
    joinRoom(roomCode);
    return () => {
      socket.emit("leave-room", roomCode);
      pcRef.current?.close();
    };
    // eslint-disable-next-line
  }, [joined]);

  const joinRoom = async (roomId) => {
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localVideoRef.current.srcObject = stream;
      localStreamRef.current = stream;
      socket.emit("join-room", roomId);
      pcRef.current = new RTCPeerConnection();
      stream.getTracks().forEach((track) => {
        pcRef.current.addTrack(track, stream);
      });
      pcRef.current.ontrack = (e) => {
        remoteVideoRef.current.srcObject = e.streams[0];
      };
      pcRef.current.onicecandidate = (e) => {
        if (e.candidate) {
          socket.emit("ice-candidate", { roomId, candidate: e.candidate });
        }
      };
      socket.on("user-joined", async () => {
        setInCall(true);
        const offer = await pcRef.current.createOffer();
        await pcRef.current.setLocalDescription(offer);
        socket.emit("offer", { roomId, offer });
      });
      socket.on("receive-offer", async ({ offer }) => {
        setInCall(true);
        await pcRef.current.setRemoteDescription(offer);
        const answer = await pcRef.current.createAnswer();
        await pcRef.current.setLocalDescription(answer);
        socket.emit("answer", { roomId, answer });
      });
      socket.on("receive-answer", async ({ answer }) => {
        await pcRef.current.setRemoteDescription(answer);
      });
      socket.on("receive-candidate", async (candidate) => {
        if (candidate) {
          await pcRef.current.addIceCandidate(candidate);
        }
      });
    } catch (err) {
      setError("Could not access camera/mic: " + err.message);
    }
  };

  const handleJoin = (e) => {
    e.preventDefault();
    if (!roomCode.trim()) {
      setError("Please enter a room code.");
      return;
    }
    setJoined(true);
  };

  const handleLeave = () => {
    setJoined(false);
    setInCall(false);
    setRoomCode("");
    if (localVideoRef.current?.srcObject) {
      localVideoRef.current.srcObject.getTracks().forEach((t) => t.stop());
    }
    if (remoteVideoRef.current?.srcObject) {
      remoteVideoRef.current.srcObject.getTracks().forEach((t) => t.stop());
    }
    setMicOn(true);
    setCamOn(true);
    setScreenSharing(false);
    socket.emit("leave-room", roomCode);
    pcRef.current?.close();
  };

  const toggleMic = () => {
    if (!localVideoRef.current?.srcObject) return;
    localVideoRef.current.srcObject.getAudioTracks().forEach(track => {
      track.enabled = !micOn;
    });
    setMicOn(m => !m);
  };

  const toggleCam = () => {
    if (!localVideoRef.current?.srcObject) return;
    localVideoRef.current.srcObject.getVideoTracks().forEach(track => {
      track.enabled = !camOn;
    });
    setCamOn(c => !c);
  };

  const handleScreenShare = async () => {
    if (!screenSharing) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        const videoTrack = screenStream.getVideoTracks()[0];
        const sender = pcRef.current.getSenders().find(s => s.track && s.track.kind === 'video');
        if (sender) sender.replaceTrack(videoTrack);
        localVideoRef.current.srcObject = screenStream;
        setScreenSharing(true);
        videoTrack.onended = () => {
          // revert to camera
          if (localStreamRef.current) {
            const camTrack = localStreamRef.current.getVideoTracks()[0];
            if (sender) sender.replaceTrack(camTrack);
            localVideoRef.current.srcObject = localStreamRef.current;
            setScreenSharing(false);
          }
        };
      } catch (err) {
        setError('Screen share failed: ' + err.message);
      }
    } else {
      // revert to camera
      if (localStreamRef.current) {
        const camTrack = localStreamRef.current.getVideoTracks()[0];
        const sender = pcRef.current.getSenders().find(s => s.track && s.track.kind === 'video');
        if (sender) sender.replaceTrack(camTrack);
        localVideoRef.current.srcObject = localStreamRef.current;
        setScreenSharing(false);
      }
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto", padding: 24, background: "#f9f9f9", borderRadius: 12, boxShadow: "0 2px 12px #0001" }}>
      <h2 style={{ textAlign: "center" }}>Video Call</h2>
      {!joined ? (
        <form onSubmit={handleJoin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <label htmlFor="roomCode">Enter Room Code:</label>
          <input
            id="roomCode"
            type="text"
            value={roomCode}
            onChange={e => setRoomCode(e.target.value)}
            style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
            placeholder="e.g. 1234 or my-room"
          />
          <button type="submit" style={{ padding: 10, borderRadius: 6, background: "#4f8cff", color: "#fff", border: "none", fontWeight: "bold" }}>Join Room</button>
          {error && <div style={{ color: "red" }}>{error}</div>}
        </form>
      ) : (
        <>
          <div className="video-container" style={{ display: "flex", gap: "10px", marginBottom: 16 }}>
            <video ref={localVideoRef} autoPlay playsInline muted width="45%" style={{ background: "#222", borderRadius: 8 }} />
            <video ref={remoteVideoRef} autoPlay playsInline width="45%" style={{ background: "#222", borderRadius: 8 }} />
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 16 }}>
            <button onClick={toggleMic} style={{ padding: 10, borderRadius: 6, background: micOn ? '#4f8cff' : '#aaa', color: '#fff', border: 'none', fontWeight: 'bold' }}>{micOn ? 'Mute Mic' : 'Unmute Mic'}</button>
            <button onClick={toggleCam} style={{ padding: 10, borderRadius: 6, background: camOn ? '#4f8cff' : '#aaa', color: '#fff', border: 'none', fontWeight: 'bold' }}>{camOn ? 'Turn Off Cam' : 'Turn On Cam'}</button>
            <button onClick={handleScreenShare} style={{ padding: 10, borderRadius: 6, background: screenSharing ? '#6ee7b7' : '#4f8cff', color: '#fff', border: 'none', fontWeight: 'bold' }}>{screenSharing ? 'Stop Sharing' : 'Share Screen'}</button>
            <button onClick={handleLeave} style={{ padding: 10, borderRadius: 6, background: '#ff4f4f', color: '#fff', border: 'none', fontWeight: 'bold' }}>Leave Room</button>
          </div>
          {error && <div style={{ color: "red" }}>{error}</div>}
        </>
      )}
    </div>
  );
};

export default VideoCall;
