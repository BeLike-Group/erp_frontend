import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import SimplePeer from 'simple-peer';
import { Link } from 'react-router-dom';

const VideoConsultation = () => {
  const [stream, setStream] = useState(null);
  const [peers, setPeers] = useState([]);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const roomId = "room-id"; // Replace with a dynamic room ID if needed

  useEffect(() => {
    // Initialize the socket connection and media
    socketRef.current = io.connect("http://localhost:5000");

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      setStream(stream);
      userVideo.current.srcObject = stream;

      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      recorder.ondataavailable = (e) => {
        setRecordedChunks(prev => [...prev, e.data]);
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'recording.webm';
        a.click();
      };

      // Join the room and set up event listeners
      socketRef.current.emit("join-room", roomId, socketRef.current.id);

      socketRef.current.on("user-connected", userId => {
        const peer = createPeer(userId, socketRef.current.id, stream);
        peersRef.current.push({
          peerID: userId,
          peer,
        });
        setPeers([...peersRef.current]);
      });

      socketRef.current.on("user-disconnected", userId => {
        const peerObj = peersRef.current.find(p => p.peerID === userId);
        if (peerObj) peerObj.peer.destroy();
        const peers = peersRef.current.filter(p => p.peerID !== userId);
        setPeers(peers);
        peersRef.current = peers;
      });

      socketRef.current.on("receive-signal", (signal, callerId) => {
        const item = peersRef.current.find(p => p.peerID === callerId);
        item.peer.signal(signal);
      });
    });

    return () => {
      // Clean up on component unmount
      if (mediaRecorder) {
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
      }
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [recordedChunks]);

  function createPeer(userToSignal, callerId, stream) {
    const peer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", signal => {
      socketRef.current.emit("sending-signal", { userToSignal, callerId, signal });
    });

    return peer;
  }

  const endCall = () => {
    // Stop recording if active
    if (mediaRecorder && recording) {
      mediaRecorder.stop();
      setRecording(false);
    }
    // Disconnect from the signaling server
    socketRef.current.disconnect();
    // Stop the local stream
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    // Clear the state
    setStream(null);
    setPeers([]);
  };

  const startRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.start();
      setRecording(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">Consultation Platform</h1>
        <p className="text-gray-600 mt-2">Start your video consultation below:</p>
      </header>

      <div className="w-full max-w-4xl mb-4">
        <div className="flex justify-center space-x-4 mb-6">
          <Link to="/">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
              Back to Home
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* User's own video stream */}
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2">Your Video</h2>
            <video
              muted
              ref={userVideo}
              autoPlay
              playsInline
              className="w-full rounded-lg shadow-lg border border-gray-700"
            />
          </div>

          {/* Peers' video streams */}
          {peers.map((peer, index) => (
            <Video key={index} peer={peer.peer} />
          ))}
        </div>

        <div className="mt-4 flex justify-center space-x-4">
          <button
            onClick={startRecording}
            className={`px-6 py-3 ${recording ? 'bg-green-500' : 'bg-blue-600'} text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300`}
          >
            {recording ? 'Recording...' : 'Start Recording'}
          </button>

          <button
            onClick={endCall}
            className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition duration-300"
          >
            End Call
          </button>
        </div>
      </div>
    </div>
  );
};

const Video = ({ peer }) => {
  const ref = useRef();

  useEffect(() => {
    peer.on("stream", stream => {
      ref.current.srcObject = stream;
    });
  }, [peer]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-2">Peer's Video</h2>
      <video ref={ref} autoPlay playsInline className="w-full rounded-lg shadow-lg border border-gray-700" />
    </div>
  );
};

export default VideoConsultation;
