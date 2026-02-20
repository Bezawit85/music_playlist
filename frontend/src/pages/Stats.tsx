import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSongsFetch } from "../features/songsSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { RootState } from "../store";

const Stats = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state: RootState) => state.songs.songs);

  useEffect(() => {
    dispatch(getSongsFetch());
  }, [dispatch]);

  const totalSongs = songs.length;
  const artists = Array.from(new Set(songs.map((s) => s.artist)));
  const albums = Array.from(new Set(songs.map((s) => s.album)));
  const genres = Array.from(new Set(songs.map((s) => s.genre)));

  const songsPerGenre = genres.map((g) => ({
    genre: g,
    count: songs.filter((s) => s.genre === g).length,
  }));

  const songsPerArtist = artists.map((a) => ({
    artist: a,
    songs: songs.filter((s) => s.artist === a).length,
    albums: Array.from(
      new Set(songs.filter((s) => s.artist === a).map((s) => s.album))
    ).length,
  }));

  const songsPerAlbum = albums.map((a) => ({
    album: a,
    count: songs.filter((s) => s.album === a).length,
  }));

  if (songs.length === 0) {
    return (
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        <ToastContainer position="top-right" theme="colored" />
        <div className="text-center py-16 px-8 text-white animate-fadeIn">
          <div className="text-6xl mb-4">📊</div>
          <p className="text-xl opacity-90">No statistics available yet. Add some songs to see your stats!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-8 py-12">
      <ToastContainer position="top-right" theme="colored" />
      
      <div className="mb-12 animate-fadeIn">
        <h1 className="text-4xl font-bold text-white m-0 mb-2 flex items-center gap-3">
          <span>📊</span>
          <span>Statistics Dashboard</span>
        </h1>
        <p className="text-lg text-white/90 m-0">Comprehensive overview of your music collection</p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 animate-[fadeIn_0.6s_ease-out_0.2s_both]">
        <div className="bg-white p-8 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)] animate-fadeIn">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-200">
            <div className="text-3xl">📈</div>
            <h3 className="text-xl font-bold text-gray-800 m-0">Overview</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white">
              <div className="text-[2.5rem] font-bold mb-2">{totalSongs}</div>
              <div className="text-sm opacity-90 font-semibold">Total Songs</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white">
              <div className="text-[2.5rem] font-bold mb-2">{artists.length}</div>
              <div className="text-sm opacity-90 font-semibold">Artists</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white">
              <div className="text-[2.5rem] font-bold mb-2">{albums.length}</div>
              <div className="text-sm opacity-90 font-semibold">Albums</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white">
              <div className="text-[2.5rem] font-bold mb-2">{genres.length}</div>
              <div className="text-sm opacity-90 font-semibold">Genres</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)] animate-fadeIn">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-200">
            <div className="text-3xl">🎸</div>
            <h3 className="text-xl font-bold text-gray-800 m-0">Songs by Genre</h3>
          </div>
          <div className="flex flex-col gap-3">
            {songsPerGenre.length > 0 ? (
              songsPerGenre.map((g) => (
                <div key={g.genre} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg transition-all duration-200 hover:bg-gray-100 hover:translate-x-1">
                  <span className="font-semibold text-gray-600">{g.genre}</span>
                  <span className="font-bold text-lg bg-gradient-to-br from-indigo-500 to-purple-600 bg-clip-text text-transparent">{g.count}</span>
                </div>
              ))
            ) : (
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-600">No genres yet</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)] animate-fadeIn">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-200">
            <div className="text-3xl">🎤</div>
            <h3 className="text-xl font-bold text-gray-800 m-0">Songs & Albums by Artist</h3>
          </div>
          <div className="flex flex-col gap-3">
            {songsPerArtist.length > 0 ? (
              songsPerArtist.map((a) => (
                <div key={a.artist} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg transition-all duration-200 hover:bg-gray-100 hover:translate-x-1">
                  <span className="font-semibold text-gray-600">{a.artist}</span>
                  <span className="font-bold text-lg bg-gradient-to-br from-indigo-500 to-purple-600 bg-clip-text text-transparent">{a.songs} songs · {a.albums} albums</span>
                </div>
              ))
            ) : (
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-600">No artists yet</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)] animate-fadeIn">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-200">
            <div className="text-3xl">💿</div>
            <h3 className="text-xl font-bold text-gray-800 m-0">Songs by Album</h3>
          </div>
          <div className="flex flex-col gap-3">
            {songsPerAlbum.length > 0 ? (
              songsPerAlbum.map((a) => (
                <div key={a.album} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg transition-all duration-200 hover:bg-gray-100 hover:translate-x-1">
                  <span className="font-semibold text-gray-600">{a.album}</span>
                  <span className="font-bold text-lg bg-gradient-to-br from-indigo-500 to-purple-600 bg-clip-text text-transparent">{a.count}</span>
                </div>
              ))
            ) : (
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-600">No albums yet</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
