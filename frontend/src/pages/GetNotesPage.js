import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import NoteForm from "../components/NoteForm";
import useAxios from "../utils/useAxios";
import { baseURL } from "../utils/config";
import Spinner from "../utils/spinner";

const GetNotes = () => {
  const { authTokens } = useContext(AuthContext);
  const history = useHistory();
  const [notes, setNotes] = useState([]);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const axios = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/notes");
        setNotes(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (authTokens) {
      fetchData();
    }
  }, [authTokens]);

  const handleNoteClick = (noteId) => {
    history.push(`/notes/${noteId}`);
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900">My Notes</h1>
        {!showNoteForm && (
          <button
            onClick={() => setShowNoteForm(true)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-2 px-8 rounded-lg shadow-lg hover:shadow-xl hover:bg-gradient-to-br transition ease-in-out duration-300 focus:outline-none focus:ring-4 focus:ring-purple-400"
          >
            Create Note
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner />
        </div>
      ) : showNoteForm ? (
        <NoteForm setNotes={setNotes} setShowNoteForm={setShowNoteForm} />
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.length ? (
            notes.map((note) => (
              <li
                key={note.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-300 transform hover:scale-105 cursor-pointer overflow-hidden"
                onClick={() => handleNoteClick(note.id)}
              >
                <div className="p-5 hover:bg-indigo-50 transition-colors duration-200">
                  <h2 className="text-2xl font-semibold text-gray-800 truncate mb-2">
                    {note.title}
                  </h2>
                  <p className="text-gray-700 line-clamp-3">{note.body}</p>
                  {note.audio_file && (
                    <audio controls className="w-full mt-4">
                      <source
                        src={`${baseURL}/${note.audio_file}`}
                        type="audio/wav"
                      />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </div>
              </li>
            ))
          ) : (
            <div className="text-center col-span-full">
              <p className="text-gray-500 text-lg">No notes found.</p>
            </div>
          )}
        </ul>
      )}
    </div>
  );
};

export default GetNotes;
