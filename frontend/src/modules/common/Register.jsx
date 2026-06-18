import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../apiConfig";
import Toast from "../common/Toast";


const Register = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState({ show: false, type: "", message: "" });
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    type: "",
  });

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.name || !data.email || !data.password || !data.type) {
      return showToast("error", "Please fill all fields");
    }

    try {
      const response = await axios.post(
        "/api/user/register",
        data
      );

      if (response.data.success) {
        showToast("success", response.data.message);
        setTimeout(() => navigate("/login"), 1000);
      } else {
        showToast("error", response.data.message);
      }
    } catch (error) {
      showToast("error", error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.16),_transparent_18%),linear-gradient(180deg,#020617_0%,#090b12_48%,#111827_100%)] flex flex-col">
      {toast.show && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
      {/* Navbar */}
<nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/70 backdrop-blur-2xl border-b border-slate-700/40 py-4 px-8 flex justify-between items-center shadow-2xl shadow-indigo-950/15">
             <h2 className="text-3xl font-extrabold text-indigo-300 tracking-wide">
               RentEase
             </h2>
             <div className="space-x-8 text-lg">
               <Link to="/" className="text-slate-200 hover:text-indigo-300 transition">
                 Home
               </Link>
               <Link to="/login" className="text-slate-200 hover:text-indigo-300 transition">
                 Login
               </Link>
               <Link
                 to="/register"
                 className="text-white bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 rounded-full shadow-xl shadow-indigo-500/20 hover:from-indigo-400 hover:to-violet-400 transition"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Register Form */}
      <div className="flex-grow flex items-center justify-center px-4 py-24">
        <div className="bg-slate-950/95 border border-indigo-500/10 backdrop-blur-2xl shadow-2xl rounded-[2rem] w-full max-w-md p-10 ring-1 ring-indigo-500/10">
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/25 to-violet-500/20 text-indigo-300 text-3xl font-bold shadow-lg shadow-indigo-500/10">
              📝
            </div>
            <h1 className="text-2xl font-semibold mt-4 text-white">
              Sign Up
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Renter Full Name / Owner Name"
              className="w-full px-4 py-3 bg-slate-900/90 border border-indigo-500/20 text-white rounded-2xl shadow-sm shadow-indigo-950/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-500 transition"
            />
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full px-4 py-3 bg-slate-900/90 border border-indigo-500/20 text-white rounded-2xl shadow-sm shadow-indigo-950/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-500 transition"
            />
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-3 bg-slate-900/90 border border-indigo-500/20 text-white rounded-2xl shadow-sm shadow-indigo-950/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-500 transition"
            />

            <select
              name="type"
              value={data.type}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-900/90 border border-indigo-500/20 text-white rounded-2xl shadow-sm shadow-indigo-950/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-500 transition"
            >
              <option value="">Select User Type</option>
              <option value="Renter">Renter</option>
              <option value="Owner">Owner</option>
              <option value="Admin">Admin</option>
            </select>

            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-3 rounded-2xl font-semibold shadow-xl shadow-indigo-500/20 hover:bg-indigo-400 transition duration-200"
            >
              Sign Up
            </button>

            <div className="text-center text-red-400 text-sm mt-4">
              Have an account?{" "}
              <Link to="/login" className="text-indigo-600 hover:underline">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
