import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../apiConfig";
import Toast from "../common/Toast";


const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      showToast("error", "Please fill all fields");
    }

    try {
      const res = await axios.post("/api/user/login", data);
      if (res.data.success) {
        showToast("success", res.data.message);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        const user = res.data.user;
        setTimeout(() => {
          switch (user.type) {
            case "Admin":
              navigate("/adminhome");
              break;
            case "Renter":
              navigate("/renterhome");
              break;
            case "Owner":
              if (user.granted === "ungranted") {
                showToast("error", "Your account is not yet confirmed by the admin");
              } else {
                navigate("/ownerhome");
              }
              break;
            default:
              navigate("/login");
              break;
          }

          window.location.reload();
        }, 1000);
      } else {
        showToast("error", res.data.message);
      }
    } catch (err) {
      showToast("error", err.response?.data?.message || "Login failed");
      navigate("/login");
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

      {/* Login Form */}
      <div className="flex-grow flex items-center justify-center px-4 py-24">
        <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="hidden rounded-[2rem] border border-indigo-500/10 bg-slate-950/90 p-10 shadow-2xl shadow-indigo-950/20 backdrop-blur-xl lg:flex lg:flex-col lg:justify-between">
            <div>
              <p className="uppercase tracking-[0.3em] text-xs text-indigo-300/70 mb-5">
                RentEase Access
              </p>
              <h2 className="text-3xl font-extrabold text-white mb-4">
                Welcome Back
              </h2>
              <p className="text-slate-300 leading-relaxed">
                Secure your next rental or manage your listings with a modern dashboard crafted for owners, renters, and admins.
              </p>
            </div>
            <div className="space-y-4">
              <div className="rounded-3xl bg-slate-900/70 p-5 border border-white/10">
                <p className="text-sm uppercase tracking-[0.3em] text-indigo-300/70">Fast Booking</p>
                <p className="mt-2 text-slate-300">Instant booking flow with owner contact details.</p>
              </div>
              <div className="rounded-3xl bg-slate-900/70 p-5 border border-white/10">
                <p className="text-sm uppercase tracking-[0.3em] text-indigo-300/70">Trusted Listings</p>
                <p className="mt-2 text-slate-300">Verified owners and consistent rental availability.</p>
              </div>
              <div className="rounded-3xl bg-slate-900/70 p-5 border border-white/10">
                <p className="text-sm uppercase tracking-[0.3em] text-indigo-300/70">Secure Access</p>
                <p className="mt-2 text-slate-300">Cookie-based authentication and secure user sessions.</p>
              </div>
            </div>
          </div>
          <div className="glass-panel w-full rounded-[2rem] border border-indigo-500/10 backdrop-blur-2xl shadow-2xl shadow-indigo-950/20 p-10 ring-1 ring-indigo-500/10">
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/25 to-violet-500/20 text-indigo-300 text-3xl font-bold shadow-lg shadow-indigo-500/10">
                🔒
              </div>
              <h1 className="text-3xl font-semibold mt-4 text-white">Sign In</h1>
              <p className="text-slate-400 mt-2">Access your dashboard, bookings, and property listings.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
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

              <button
                type="submit"
                className="w-full bg-indigo-500 text-white py-3 rounded-2xl font-semibold shadow-xl shadow-indigo-500/20 hover:bg-indigo-400 transition duration-200"
              >
                Sign In
              </button>

              <div className="flex justify-between text-sm mt-4">
                <Link to="/forgotpassword" className="text-red-400 hover:underline">
                  Forgot Password?
                </Link>
                <Link to="/register" className="text-indigo-400 hover:underline">
                  Create an Account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
