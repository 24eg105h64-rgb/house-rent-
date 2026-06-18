import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../App";
import PropTypes from "prop-types";
import AllPropertiesCards from "../AllPropertiesCards";
import AllProperty from "./AllProperties";

const CustomTabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index} className="w-full mt-6">
      {value === index && <div>{children}</div>}
    </div>
  );
};

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const RenterHome = () => {
  const user = useContext(UserContext);
  const [value, setValue] = useState(0);

  if (!user || !user.userData) return null;

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.12),_transparent_15%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.12),_transparent_18%),linear-gradient(180deg,#060a14_0%,#080f1a_45%,#111827_100%)]">
      {/* Navbar */}
      <nav className="bg-slate-950/85 backdrop-blur-2xl shadow-2xl shadow-indigo-950/20 px-6 py-4 flex items-center justify-between border-b border-slate-700/40">
        <h2 className="text-3xl font-extrabold text-indigo-300 tracking-wide">RentEase</h2>
        <div className="flex items-center gap-6">
          <h5 className="font-medium text-slate-200">
            Hi, {user.userData.name}
          </h5>
          <Link
            to="/"
            onClick={handleLogOut}
            className="px-4 py-2 text-sm bg-gradient-to-r from-rose-500 to-red-500 text-white rounded-full shadow-lg hover:from-rose-400 hover:to-red-400 transition"
          >
            Log Out
          </Link>
        </div>
      </nav>

      {/* Tabs */}
      <div className="w-full max-w-5xl mx-auto mt-10 bg-slate-950/90 border border-indigo-500/10 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.95)] rounded-[2rem] p-6 backdrop-blur-2xl">
        <div className="flex flex-wrap gap-4 border-b border-slate-700 pb-3">
          <button
            className={`px-6 py-2 text-sm font-medium transition-colors ${value === 0
                ? "text-indigo-400 border-b-2 border-indigo-400"
                : "text-slate-400 hover:text-indigo-300"
              }`}
            onClick={() => setValue(0)}
          >
            All Properties
          </button>
          <button
            className={`px-6 py-2 text-sm font-medium transition-colors ${value === 1
                ? "text-indigo-400 border-b-2 border-indigo-400"
                : "text-slate-400 hover:text-indigo-300"
              }`}
            onClick={() => setValue(1)}
          >
            Booking History
          </button>
        </div>

        {/* Tab Panels */}
        <CustomTabPanel value={value} index={0}>
          <div className="mt-6">
            <AllPropertiesCards loggedIn={user.userLoggedIn} />
          </div>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <div className="mt-6">
            <AllProperty />
          </div>
        </CustomTabPanel>
      </div>
    </div>
  );
};

export default RenterHome;
