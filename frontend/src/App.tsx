import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSongsFetch } from "./features/songsSlice";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Stats from "./pages/Stats";

const NavContent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isStatsPage = location.pathname === '/stats';
  
  return (
    <nav className="bg-white/95 backdrop-blur-md px-8 py-6 shadow-md flex items-center justify-between sticky top-0 z-[100]">
      <div className="text-2xl font-bold bg-gradient-to-br from-indigo-500 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
        <span>🎵</span>
        <span>Musical</span>
      </div>
      <div className="flex gap-4">
        <Link 
          to="/" 
          className={`px-6 py-3 rounded-lg no-underline font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
            isHomePage 
              ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white' 
              : 'bg-transparent text-gray-600 hover:bg-indigo-500/10'
          }`}
        >
          Songs
        </Link>
        <Link 
          to="/stats" 
          className={`px-6 py-3 rounded-lg no-underline font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
            isStatsPage 
              ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white' 
              : 'bg-transparent text-gray-600 hover:bg-indigo-500/10'
          }`}
        >
          Statistics
        </Link>
      </div>
    </nav>
  );
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSongsFetch());
  }, [dispatch]);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
        <NavContent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
