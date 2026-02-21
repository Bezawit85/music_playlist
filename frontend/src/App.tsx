import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSongsFetch } from "./features/songsSlice";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import Sidebar from "./components/Sidebar";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSongsFetch());
  }, [dispatch]);

  return (
    <Router>
      <div className="flex min-h-screen bg-slate-950 text-slate-200">
        <Sidebar />

        <main className="flex-1 min-h-screen relative overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
