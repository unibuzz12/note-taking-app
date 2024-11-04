// NoteForm.js
import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";
import { baseURL } from "../utils/config";
import VoiceRecorder from "./VoiceRecorder";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NoteForm({ setNotes = () => {} }) {
  const navigate = useHistory();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("");
  const [audioBlob, setAudioBlob] = useState(null); // State for final audio blob
  const [isRecording, setIsRecording] = useState(false); // Track recording status

  const { authTokens } = useContext(AuthContext);
  const axios = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`api/notes/${id}/`);
        setTitle(res.data.title);
        setBody(res.data.body);
        setUserId(res.data.user);
      } catch (error) {
        navigate("/notes");
      }
    };

    if (authTokens && id) {
      fetchData();
    }
  }, [authTokens, id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    if (audioBlob) {
      const uniqueFileName = `recording-${userId}-${Date.now()}.wav`;
      formData.append("audio_file", audioBlob, uniqueFileName);
    }

    try {
      let response;
      if (id) {
        response = await axios.patch(
          `${baseURL}/api/notes/${id}/update/`,
          formData
        );
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === response.data.id ? response.data : note
          )
        );
        toast.success("Note updated successfully!");
        navigate.push(`/notes/`);
      } else {
        response = await axios.post(`${baseURL}/api/notes/create/`, formData);
        setNotes((prevNotes) => [response.data, ...prevNotes]);
        toast.success("Note created successfully!");
        window.location.reload();
      }
      setTitle("");
      setBody("");
      setAudioBlob(null); // Reset audio blob after submission
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:shadow-xl"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          {id ? "Edit Note" : "Create Note"}
        </h2>
        <VoiceRecorder
          onRecordingComplete={setAudioBlob}
          isRecording={isRecording}
          setIsRecording={setIsRecording}
        />

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border border-gray-300 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-gray-900"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="body"
            className="block font-medium text-gray-700 mb-1"
          >
            Body
          </label>
          <textarea
            name="body"
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows="5"
            className="border border-gray-300 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-gray-900"
          ></textarea>
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="submit"
            disabled={isRecording} // Disable while recording
            className={`${
              isRecording ? "bg-gray-300" : "bg-blue-600 hover:bg-blue-700"
            } text-white font-semibold px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
          >
            {id ? "Update Note" : "Create Note"}
          </button>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default NoteForm;
