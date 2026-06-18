import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import AllUsers from "./AllUsers";
import AllProperty from "./AllProperty";
import AllBookings from "./AllBookings";

const AdminHome = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("users");

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

if (!user || !user.userData) return null;

  return (
<div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.12),_transparent_15%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.12),_transparent_18%),linear-gradient(180deg,#060a14_0%,#080f1a_45%,#111827_100%)] text-white">
  {/* Navbar */}
  <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/85 backdrop-blur-2xl border-b border-slate-700/40 py-4 px-8 flex justify-between items-center shadow-2xl shadow-indigo-950/20">
    <h2 className="text-3xl font-extrabold text-indigo-300 tracking-wide">RentEase</h2>
    <div className="flex items-center space-x-6">
      <span className="text-slate-200">Hi, {user.userData.name}</span>
      <button
        onClick={handleLogOut}
        className="px-4 py-2 bg-gradient-to-r from-rose-500 to-red-500 text-white rounded-full hover:from-rose-400 hover:to-red-400 transition shadow-lg"
      >
        Log Out
      </button>
    </div>
  </nav>

  {/* Admin Tabs */}
  <div className="max-w-6xl mx-auto w-full py-28 px-4">
    {/* Tabs */}
    <div className="flex flex-wrap gap-4 mb-8 rounded-[2rem] bg-slate-950/85 border border-indigo-500/10 p-4 shadow-[0_30px_80px_-40px_rgba(56,189,248,0.40)]">
      <button
        onClick={() => setActiveTab("users")}
        className={`pb-2 px-4 text-lg font-medium transition ${
          activeTab === "users"
            ? "border-b-2 border-indigo-400 text-indigo-400"
            : "text-slate-400 hover:text-indigo-300"
        }`}
      >
        All Users
      </button>
      <button
        onClick={() => setActiveTab("properties")}
        className={`pb-2 px-4 text-lg font-medium transition ${
          activeTab === "properties"
            ? "border-b-2 border-indigo-400 text-indigo-400"
            : "text-slate-400 hover:text-indigo-300"
        }`}
      >
        All Properties
      </button>
      <button
        onClick={() => setActiveTab("bookings")}
        className={`pb-2 px-4 text-lg font-medium transition ${
          activeTab === "bookings"
            ? "border-b-2 border-indigo-400 text-indigo-400"
            : "text-slate-400 hover:text-indigo-300"
        }`}
      >
        All Bookings
      </button>
    </div>

    {/* Tab Panels */}
    <div className="bg-slate-950/90 backdrop-blur-2xl border border-indigo-500/10 rounded-[2rem] p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.95)] text-slate-100">
      {activeTab === "users" && <AllUsers />}
      {activeTab === "properties" && <AllProperty />}
      {activeTab === "bookings" && <AllBookings />}
    </div>
  </div>
</div>

  );
};

export default AdminHome;
