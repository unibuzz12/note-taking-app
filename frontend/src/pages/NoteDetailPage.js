import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import moment from "moment";
import Modal from "react-modal";
import NoteForm from "../components/NoteForm";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";
import { baseURL } from "../utils/config";

Modal.setAppElement("#root"); // Set the root element for accessibility

function NoteDetail() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [editing, setEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const { authTokens } = useContext(AuthContext);
  const axiosInstance = useAxios(authTokens);
  const history = useHistory();

  useEffect(() => {
    if (authTokens) {
      axiosInstance
        .get(`api/notes/${id}/`)
        .then((response) => {
          setNote(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [authTokens, id]);

  const handleUpdate = async (formData) => {
    try {
      const response = await axiosInstance.patch(`/api/notes/${id}/`, formData);
      setNote(response.data);
      setEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/api/notes/${id}/delete`);
      history.push("/notes");
    } catch (error) {
      console.error(error);
    }
  };

  if (!authTokens) {
    return <div>Loading...</div>;
  }

  if (!note) {
    return <div>Loading...</div>;
  }

  if (editing) {
    return <NoteForm note={note} handleSubmit={handleUpdate} />;
  }

  return (
    <div className="max-w-3xl h-auto mx-auto my-12 p-10 bg-white rounded-2xl shadow-lg">
      {note.audio_file && (
        <audio controls className="w-full mt-3">
          <source src={`${baseURL}/${note.audio_file}`} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      )}
      <h1 className="text-4xl font-semibold text-gray-900 mb-5">
        {note.title}
      </h1>
      <p className="text-gray-700 text-lg mb-6 leading-relaxed">{note.body}</p>
      <p className="text-sm text-gray-500 mb-8">
        Last updated: {moment(note.updated).format("MMMM Do YYYY, h:mm:ss a")}
      </p>
      <div className="flex space-x-4">
        <button
          className="flex-grow bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          onClick={() => setEditing(true)}
        >
          Edit Note
        </button>
        <button
          className="flex-grow bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          onClick={() => setIsModalOpen(true)}
        >
          Delete Note
        </button>
      </div>

      {/* Modal for delete confirmation */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="bg-white p-6 rounded-lg shadow-xl max-w-md mx-auto my-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Confirm Delete
        </h2>
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete this note? This action cannot be
          undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-200"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
            onClick={() => {
              handleDelete();
              setIsModalOpen(false);
            }}
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default NoteDetail;
