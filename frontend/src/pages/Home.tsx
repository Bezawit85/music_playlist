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
import { Play, Plus, Edit2, Trash2 } from "lucide-react";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.artist)
      return toast.error("Please fill required fields");

    if (editId) dispatch(updateSongFetch({ id: editId, data: formData }));
    else dispatch(createSongFetch(formData));

    setShowModal(false);
    setFormData({ title: "", artist: "", album: "", genre: "" });
  };

  return (
    <div className="px-8 py-8 h-full">
      <ToastContainer theme="dark" />

      <div className="relative h-[380px] rounded-[2.5rem] overflow-hidden mb-12 group shadow-2xl">
        <img
          src="https://i.pinimg.com/736x/7d/c4/12/7dc412d2fe52a9fd69d3cae4f40b677e.jpg"
          alt="Featured"
          className="w-full h-full object-cover brightness-[0.4] group-hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>

        <div className="absolute bottom-12 left-12 max-w-2xl font-sans">
          <span className="bg-secondary/30 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-6 inline-block backdrop-blur-md border border-white/10">
            Featured Artist
          </span>
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight font-header opacity-95">
            Living Melody
          </h1>
          <p className="text-slate-300 text-base font-medium mb-10 leading-relaxed opacity-90">
            Make a joyful noise to the Lord, all the earth!
          </p>

          <div className="flex items-center gap-5">
            <button className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-white hover:bg-secondary/80 hover:scale-110 transition-all shadow-xl shadow-secondary/20">
              <Play className="w-7 h-7 fill-current ml-1" />
            </button>
            <button className="px-10 py-4 rounded-full border border-white/20 text-white font-bold text-sm hover:bg-white/10 hover:border-white/40 transition-all backdrop-blur-sm">
              Follow Artist
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8 px-2">
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
          Recently Played
        </h2>
        <div className="flex items-center gap-8">
          <button className="text-xs font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-colors">
            View all
          </button>
          <button
            onClick={() => {
              setEditId(null);
              setFormData({ title: "", artist: "", album: "", genre: "" });
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-white text-black font-bold py-3 px-6 rounded-full transition-all hover:scale-105 active:scale-95 shadow-xl text-xs"
          >
            <Plus className="w-4 h-4" />
            Add Track
          </button>
        </div>
      </div>

      {/* Songs Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 px-2">
        {songs.map((song) => (
          <div
            key={song._id}
            className="group bg-white/5 border border-white/5 p-4 rounded-3xl hover:bg-white/10 hover:border-white/10 transition-all duration-500 relative shadow-lg"
          >
            <div className="aspect-square bg-slate-900 rounded-2xl mb-4 overflow-hidden relative shadow-2xl">
              <img
                src={`https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&h=400&fit=crop&q=80&sig=${song._id}`}
                alt={song.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
                <button className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-black transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 shadow-2xl hover:scale-110">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </button>
              </div>
            </div>

            <div className="flex justify-between items-start mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-white truncate mb-0.5 group-hover:text-secondary transition-colors">
                  {song.title}
                </h3>
                <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider truncate mb-2">
                  {song.artist}
                </p>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                <button
                  onClick={() => {
                    setEditId(song._id);
                    setFormData(song);
                    setShowModal(true);
                  }}
                  className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => dispatch(deleteSongFetch(song._id))}
                  className="p-2 text-rose-500/70 hover:text-rose-400 hover:bg-rose-500/10 rounded-full transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/5 pt-3">
              <span className="text-[9px] font-black text-secondary/80 uppercase tracking-[0.1em] bg-secondary/10 px-2 py-0.5 rounded-full">
                {song.genre}
              </span>
              <span className="text-[9px] font-bold text-slate-600 truncate max-w-[60px]">
                {song.album}
              </span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-xl p-4 animate-in fade-in duration-300">
          <div className="bg-[#0e0e11] border border-white/10 w-full max-w-lg p-10 rounded-[3rem] shadow-[0_0_100px_rgba(79,70,229,0.15)] animate-in zoom-in-95 duration-500">
            <h2 className="text-4xl font-black text-white mb-10 tracking-tighter">
              {editId ? "Update Track" : "Add New Track"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                    Track Title
                  </label>
                  <input
                    className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white placeholder:text-slate-700 focus:ring-1 focus:ring-secondary/50 focus:bg-white/[0.08] outline-none transition-all"
                    placeholder="Track name"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                    Artist Name
                  </label>
                  <input
                    className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white placeholder:text-slate-700 focus:ring-1 focus:ring-secondary/50 focus:bg-white/[0.08] outline-none transition-all"
                    placeholder="Artist name"
                    value={formData.artist}
                    onChange={(e) =>
                      setFormData({ ...formData, artist: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                    Album
                  </label>
                  <input
                    className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white placeholder:text-slate-700 focus:ring-1 focus:ring-secondary/50 focus:bg-white/[0.08] outline-none transition-all"
                    placeholder="Album name"
                    value={formData.album}
                    onChange={(e) =>
                      setFormData({ ...formData, album: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                    Genre
                  </label>
                  <input
                    className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white placeholder:text-slate-700 focus:ring-1 focus:ring-secondary/50 focus:bg-white/[0.08] outline-none transition-all"
                    placeholder="E.g. Melodic Techno"
                    value={formData.genre}
                    onChange={(e) =>
                      setFormData({ ...formData, genre: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex gap-6 pt-6">
                <button
                  type="submit"
                  className="flex-1 bg-white text-black font-black py-4 rounded-2xl transition-all shadow-2xl hover:scale-[1.02] active:scale-95"
                >
                  {editId ? "Update Track" : "Save Track"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-10 py-4 text-slate-400 hover:text-white font-bold transition-all"
                >
                  Cancel
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
