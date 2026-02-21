import { Home, LayoutGrid, Music2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: LayoutGrid, label: "Stats", path: "/stats" },
  ];

  return (
    <div className="w-64 h-screen bg-[#141b25] flex flex-col p-6 sticky top-0 border-r border-white/5">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center shadow-lg shadow-secondary/20">
          <Music2 className="text-white w-6 h-6" />
        </div>
        <span className="text-2xl font-black text-white tracking-tight font-header">
          Harmony
        </span>
      </div>

      {/* Main Menu */}
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-secondary/10 text-secondary shadow-sm"
                  : "text-slate-500 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon
                className={`w-5 h-5 ${isActive ? "text-secondary" : ""}`}
              />
              <span className="font-semibold">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Profile Section Placeholder */}
      <div className="mt-auto pt-6 border-t border-white/5">
        <div className="p-3 rounded-2xl bg-white/5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-500 to-primary flex items-center justify-center text-white font-bold">
            JD
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-tight">
              John Doe
            </p>
            <p className="text-[10px] text-slate-500 uppercase font-black">
              Premium Plan
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
