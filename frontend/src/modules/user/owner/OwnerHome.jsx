import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../App";
import AddProperty from "./AddProperty";
import AllProperties from "./AllProperties";
import AllBookings from "./AllBookings";

const tabs = [
  { name: "Add Property", component: <AddProperty /> },
  { name: "All Properties", component: <AllProperties /> },
  { name: "All Bookings", component: <AllBookings /> },
];

const OwnerHome = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  if (!user || !user.userData) return null;

  const handleLogOut = () => {
    document.cookie =
      "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.12),_transparent_15%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.12),_transparent_18%),linear-gradient(180deg,#060a14_0%,#080f1a_45%,#111827_100%)] text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-2xl border-b border-slate-700/40 shadow-2xl shadow-indigo-950/20">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <h2 className="text-3xl font-extrabold text-indigo-300 tracking-wide">RentEase</h2>
          <div className="flex items-center gap-6">
            <h5 className="font-medium text-slate-200">
              Hi {user.userData.name}
            </h5>
            <button
              onClick={handleLogOut}
              className="px-4 py-2 text-sm bg-gradient-to-r from-rose-500 to-red-500 text-white rounded-full shadow-lg hover:from-rose-400 hover:to-red-400 transition duration-200"
            >
              Log Out
            </button>
          </div>
        </div>
      </nav>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-wrap gap-4 border-b border-slate-700 bg-slate-950/80 rounded-[1.5rem] p-3 shadow-lg shadow-indigo-950/10">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 font-medium text-sm transition-all duration-200 rounded-t-lg
            ${activeTab === index
                  ? "text-indigo-400 border-b-2 border-indigo-500 bg-indigo-500/10 shadow-inner"
                  : "text-slate-400 hover:text-indigo-300 hover:bg-slate-800/40"
                }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-slate-950/90 border border-indigo-500/10 backdrop-blur-2xl mt-6 p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.95)] rounded-[2rem] transition-all">
          {tabs[activeTab].component}
        </div>
      </div>
    </div>

  );
};

export default OwnerHome;
