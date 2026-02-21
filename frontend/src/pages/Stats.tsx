import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getStatsFetch } from "../features/songsSlice";
import type { RootState } from "../store";
import {
  BarChart3,
  Clock,
  TrendingUp,
  Users,
  Disc,
  Music2,
  Heart,
} from "lucide-react";

const Stats = () => {
  const dispatch = useDispatch();
  const { stats, isLoading } = useSelector((state: RootState) => state.songs);

  useEffect(() => {
    dispatch(getStatsFetch());
  }, [dispatch]);

  if (isLoading || !stats)
    return (
      <div className="flex items-center justify-center h-full font-sans">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-500 font-bold uppercase tracking-[0.2em] animate-pulse">
            Analysing your music universe...
          </p>
        </div>
      </div>
    );

  const topGenre = stats.songsByGenre[0] || { _id: "N/A", count: 0 };
  const topArtist = stats.songsByArtist[0] || {
    _id: "N/A",
    songs: 0,
    albums: [],
  };

  return (
    <div className="px-8 py-8 h-full">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10 mt-4 px-2">
        <div className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center text-secondary shadow-inner">
          <BarChart3 className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight font-header opacity-95">
            Listening Stats
          </h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.1em]">
            Your musical activity at a glance
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 px-2">
        <div className="bg-[#121214] border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden group hover:border-secondary/30 transition-all duration-500">
          <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/10 blur-[100px] -mr-20 -mt-20 group-hover:bg-secondary/20 transition-all duration-700"></div>

          <div className="flex justify-between items-start mb-12 relative z-10">
            <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary-500">
              <Clock className="w-7 h-7" />
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 font-black text-xs bg-emerald-400/10 px-3 py-1.5 rounded-full border border-emerald-400/20">
              <TrendingUp className="w-4 h-4" />
              <span>+12.4%</span>
            </div>
          </div>

          <div className="relative z-10">
            <p className="text-slate-500 text-xs font-black uppercase tracking-[0.2em] mb-2">
              Minutes Listened
            </p>
            <div className="flex items-baseline gap-3">
              <h2 className="text-6xl font-black text-white tracking-tighter">
                {stats.totalSongs * 3.5 || 0}
              </h2>
              <span className="text-slate-500 font-bold text-lg lowercase">
                min
              </span>
            </div>
            <div className="mt-6 h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-gradient-to-r from-secondary to-secondary/60 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-[#121214] border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden group hover:border-secondary/30 transition-all duration-500">
          <div className="flex items-start mb-10">
            <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary-500">
              <Users className="w-7 h-7" />
            </div>
          </div>

          <p className="text-slate-500 text-xs font-black uppercase tracking-[0.2em] mb-4">
            Top Artist
          </p>
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-slate-900 overflow-hidden border-2 border-white/10 shadow-2xl group-hover:scale-105 transition-transform duration-500">
              <img
                src={`https://i.pinimg.com/1200x/de/85/82/de8582824fcf727cdcefc6227709d520.jpg`}
                alt={topArtist._id}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-3xl font-black text-white tracking-tight leading-tight mb-1">
                {topArtist._id}
              </h3>
              <p className="text-secondary-400 text-[10px] font-black uppercase tracking-widest">
                {topArtist.songs} Tracks Streamed
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#121214] border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden group hover:border-secondary/30 transition-all duration-500">
          <div className="flex items-start mb-10">
            <div className="w-14 h-14 bg-secondary/20 rounded-2xl flex items-center justify-center text-secondary-400">
              <Disc className="w-7 h-7" />
            </div>
          </div>

          <p className="text-slate-500 text-xs font-black uppercase tracking-[0.2em] mb-2">
            Favorite Genre
          </p>
          <h2 className="text-4xl font-black text-white tracking-tighter mb-6">
            {topGenre._id}
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
              <span>Engagement Score</span>
              <span className="text-white">
                {Math.round((topGenre.count / stats.totalSongs) * 100) || 0}%
              </span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-secondary to-secondary/60 rounded-full group-hover:shadow-[0_0_15px_rgba(79,70,229,0.4)] transition-all duration-1000"
                style={{
                  width: `${(topGenre.count / stats.totalSongs) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8 px-2">
        {/* Genre Breakdown */}
        <div className="bg-[#121214] border border-white/5 p-10 rounded-[3rem] relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-10">
            <Music2 className="w-20 h-20 text-white/[0.02] transform rotate-12" />
          </div>
          <h3 className="text-2xl font-black text-white mb-10 flex items-center gap-3">
            <span className="w-3 h-8 bg-secondary rounded-full shadow-[0_0_15px_rgba(79,70,229,0.5)]"></span>
            Genre Distribution
          </h3>
          <div className="space-y-8">
            {stats.songsByGenre.map((g) => (
              <div key={g._id} className="group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-slate-400 group-hover:text-white transition-colors uppercase tracking-[0.2em]">
                    {g._id || "Unknown"}
                  </span>
                  <span className="text-secondary-400 font-black text-sm bg-secondary/10 px-3 py-1 rounded-lg">
                    {g.count}
                  </span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div
                    className="h-full bg-secondary/40 group-hover:bg-secondary-500 rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${(g.count / stats.totalSongs) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#121214] border border-white/5 p-10 rounded-[3rem] shadow-2xl">
          <h3 className="text-2xl font-black text-white mb-10">
            Artist Leaderboard
          </h3>
          <div className="space-y-2">
            {stats.songsByArtist.map((a, idx) => (
              <div
                key={a._id}
                className="group flex items-center justify-between p-5 rounded-[1.5rem] hover:bg-white/5 border border-transparent hover:border-white/5 transition-all duration-300"
              >
                <div className="flex items-center gap-6">
                  <span className="text-slate-800 font-black text-3xl italic group-hover:text-secondary/20 transition-colors">
                    #{idx + 1}
                  </span>
                  <div>
                    <div className="text-lg font-black text-white group-hover:text-secondary transition-colors uppercase tracking-tight font-header">
                      {a._id}
                    </div>
                    <div className="text-[10px] text-slate-600 font-black uppercase tracking-[0.2em] mt-1">
                      {a.albums.length} Albums • {a.songs} Tracks
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="h-10 w-px bg-white/5 mx-2 hidden md:block"></div>
                  <button className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-700 hover:text-rose-500 hover:bg-rose-500/10 transition-all">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
