import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  getSongsFetch,
  createSongFetch,
  deleteSongFetch,
  updateSongFetch,
} from "../features/songsSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { Song } from "../types";
import type { RootState } from "../store";

const Home = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state: RootState) => state.songs.songs);

  const [formData, setFormData] = useState<Omit<Song, "_id">>({
    title: "",
    artist: "",
    album: "",
    genre: "",
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getSongsFetch());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { title, artist, album, genre } = formData;
    if (!title || !artist || !album || !genre) {
      toast.error("All fields are required");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editId) {
      dispatch(updateSongFetch({ id: editId, data: formData }));
      toast.success("Song updated successfully");
    } else {
      dispatch(createSongFetch(formData));
      toast.success("Song added successfully");
    }

    setFormData({ title: "", artist: "", album: "", genre: "" });
    setEditId(null);
    setShowModal(false);
  };

  const handleEdit = (song: Song) => {
    setEditId(song._id);
    setFormData({
      title: song.title,
      artist: song.artist,
      album: song.album,
      genre: song.genre,
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteSongFetch(id));
    toast.success("Song deleted");
  };

  const openAddModal = () => {
    setEditId(null);
    setFormData({ title: "", artist: "", album: "", genre: "" });
    setShowModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <ToastContainer position="top-right" theme="colored" />
      
      <div className="flex justify-between items-center mb-8 animate-[fadeIn_0.5s_ease-out]">
        <h1 className="text-4xl font-bold text-white m-0 flex items-center gap-3">
          <span>🎵</span>
          <span>My Songs</span>
        </h1>
        <button 
          onClick={openAddModal}
          className="px-8 py-4 text-base bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_5px_15px_rgba(0,0,0,0.2)] active:translate-y-0 flex items-center gap-2"
        >
          <span>+</span>
          <span>Add Song</span>
        </button>
      </div>

      {songs.length === 0 ? (
        <div className="text-center py-16 px-8 text-white animate-[fadeIn_0.5s_ease-out]">
          <div className="text-6xl mb-4">🎸</div>
          <p className="text-xl mb-6 opacity-90">No songs yet. Start by adding your first song!</p>
          <button 
            onClick={openAddModal}
            className="px-8 py-4 text-base bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_5px_15px_rgba(0,0,0,0.2)] active:translate-y-0 flex items-center gap-2 mx-auto"
          >
            <span>+</span>
            <span>Add Your First Song</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6 animate-[fadeIn_0.6s_ease-out_0.2s_both]">
          {songs.map((song) => (
            <div 
              key={song._id}
              className="bg-white rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)] animate-[fadeIn_0.4s_ease-out]"
            >
              <h3 className="text-xl font-bold text-gray-800 m-0 mb-4 flex items-center gap-2">
                <span>🎵</span>
                <span>{song.title}</span>
              </h3>
              <div className="flex flex-col gap-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-semibold text-indigo-500">🎤 Artist:</span>
                  <span>{song.artist}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-semibold text-indigo-500">💿 Album:</span>
                  <span>{song.album}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-semibold text-indigo-500">🎸 Genre:</span>
                  <span>{song.genre}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button 
                  onClick={() => handleEdit(song)}
                  className="flex-1 px-6 py-3 bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_5px_15px_rgba(0,0,0,0.2)] active:translate-y-0"
                >
                  ✏️ Edit
                </button>
                <button 
                  onClick={() => handleDelete(song._id)}
                  className="flex-1 px-6 py-3 bg-gradient-to-br from-pink-400 to-red-500 text-white border-none rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_5px_15px_rgba(0,0,0,0.2)] active:translate-y-0"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div 
          onClick={() => setShowModal(false)}
          className="fixed top-0 left-0 w-full h-full bg-black/60 backdrop-blur-sm flex justify-center items-center z-[1000] animate-[fadeIn_0.2s_ease-out]"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-10 rounded-[20px] w-[90%] max-w-[500px] shadow-[0_20px_60px_rgba(0,0,0,0.3)] animate-[slideIn_0.3s_ease-out]"
          >
            <h2 className="text-[1.75rem] font-bold text-gray-800 m-0 mb-6 bg-gradient-to-br from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              {editId ? "✏️ Edit Song" : "➕ Add New Song"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-gray-600 text-sm">Song Title</label>
                <input
                  name="title"
                  placeholder="Enter song title"
                  value={formData.title}
                  onChange={handleChange}
                  className="p-3.5 border-2 border-gray-200 rounded-lg text-base transition-all duration-300 focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-gray-600 text-sm">Artist</label>
                <input
                  name="artist"
                  placeholder="Enter artist name"
                  value={formData.artist}
                  onChange={handleChange}
                  className="p-3.5 border-2 border-gray-200 rounded-lg text-base transition-all duration-300 focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-gray-600 text-sm">Album</label>
                <input
                  name="album"
                  placeholder="Enter album name"
                  value={formData.album}
                  onChange={handleChange}
                  className="p-3.5 border-2 border-gray-200 rounded-lg text-base transition-all duration-300 focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-gray-600 text-sm">Genre</label>
                <input
                  name="genre"
                  placeholder="Enter genre"
                  value={formData.genre}
                  onChange={handleChange}
                  className="p-3.5 border-2 border-gray-200 rounded-lg text-base transition-all duration-300 focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)]"
                />
              </div>
              <div className="flex gap-2 mt-4">
                <button 
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_5px_15px_rgba(0,0,0,0.2)] active:translate-y-0"
                >
                  {editId ? "💾 Update" : "➕ Create"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 border-none rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_5px_15px_rgba(0,0,0,0.2)] active:translate-y-0"
                >
                  ✖️ Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
