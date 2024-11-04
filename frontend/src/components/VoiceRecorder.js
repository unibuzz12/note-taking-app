// VoiceRecorder.js
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function VoiceRecorder({ onRecordingComplete, isRecording, setIsRecording }) {
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = React.useRef(null);

  useEffect(() => {
    let timer;
    if (isRecording) {
      timer = setInterval(() => setRecordingTime((prev) => prev + 1), 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const startRecording = async (e) => {
    e.preventDefault();
    try {
      setIsRecording(true);
      setRecordingTime(0);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        onRecordingComplete(event.data);
      };
      mediaRecorderRef.current.start();
    } catch (error) {
      setIsRecording(false);
      toast.error("Audio device not found.");
    }
  };

  const stopRecording = (e) => {
    e.preventDefault();
    setIsRecording(false);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    } else {
      toast.error("No audio device detected");
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 text-center">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Voice Recorder
      </h2>
      <div className="flex justify-center items-center space-x-4">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`w-16 h-16 rounded-full flex items-center justify-center 
            ${isRecording ? "bg-red-600" : "bg-blue-600"} 
            text-white text-3xl`}
          aria-label={isRecording ? "Stop recording" : "Start recording"}
        >
          {isRecording ? "■" : "▶"}
        </button>
      </div>
      <p className="text-gray-500 mt-3">
        {isRecording ? "Recording..." : "Press to start recording"}
      </p>
      <p className="text-xl font-bold text-gray-800 mt-1">
        {formatTime(recordingTime)}
      </p>
    </div>
  );
}

export default VoiceRecorder;
