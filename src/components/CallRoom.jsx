import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND_URL);

const CallRoom = () => {
  const { roomId } = useParams();
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const pcRef = useRef();
  const localStreamRef = useRef();

  useEffect(() => {
    joinRoom();

    return () => {
      socket.emit("leave-room", roomId);
      pcRef.current?.close();
    };
  }, []);

  const joinRoom = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

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
        socket.emit("ice-candidate", {
          roomId,
          candidate: e.candidate,
        });
      }
    };

    socket.on("user-joined", async () => {
      const offer = await pcRef.current.createOffer();
      await pcRef.current.setLocalDescription(offer);
      socket.emit("offer", { roomId, offer });
    });

    socket.on("receive-offer", async ({ offer }) => {
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
  };

  return (
    <div>
      <h3>Room: {roomId}</h3>
      <div className="video-container">
        <video ref={localVideoRef} autoPlay playsInline muted />
        <video ref={remoteVideoRef} autoPlay playsInline />
      </div>
    </div>
  );
};

export default CallRoom;
