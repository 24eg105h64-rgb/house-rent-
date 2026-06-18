import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../apiConfig";
import Toast from "../common/Toast";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState({ show: false, type: "", message: "" });
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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

    if (!data.email || !data.password || !data.confirmPassword) {
      return showToast("error", "Please fill all fields");
    }

    if (data.password !== data.confirmPassword) {
       return showToast("error", "Passwords do not match");
    }

    try {
      const res = await axios.post("/api/user/forgotpassword", data);

      if (res.data.success) {
        showToast("Your password has been changed!");
        navigate("/login");
      } else {
        showToast(res.data.message);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        showToast("User doesn't exist");
      } else {
        showToast("Something went wrong. Please try again.");
      }
      navigate("/register");
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
     <nav className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-lg shadow-md py-4 px-8 flex justify-between items-center">
             <h2 className="text-3xl font-extrabold text-indigo-400 tracking-wide">
               RentEase
             </h2>
             <div className="space-x-8 text-lg">
               <Link to="/" className="text-gray-200 hover:text-indigo-400 transition">
                 Home
               </Link>
               <Link to="/login" className="text-gray-200 hover:text-indigo-400 transition">
                 Login
               </Link>
               <Link
                 to="/register"
                 className="text-black bg-indigo-400 px-4 py-2 rounded-lg shadow hover:bg-indigo-500 transition"
               >
                 Register
               </Link>
             </div>
           </nav>

      {/* Forgot Password Form */}
      <div className="flex-grow flex items-center justify-center px-4 py-24">
        <div className="bg-slate-950/95 border border-indigo-500/10 backdrop-blur-2xl shadow-2xl rounded-[2rem] w-full max-w-md p-10 ring-1 ring-indigo-500/10">
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/25 to-violet-500/20 text-indigo-300 text-3xl font-bold shadow-lg shadow-indigo-500/10">
              🔑
            </div>
            <h1 className="text-2xl font-semibold mt-4 text-white">
              Forgot Password?
            </h1>
            <p className="text-slate-300 text-sm mt-1">
              Enter your email and new password to reset your account
            </p>
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
              placeholder="New Password"
              className="w-full px-4 py-3 bg-slate-900/90 border border-indigo-500/20 text-white rounded-2xl shadow-sm shadow-indigo-950/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-500 transition"
            />
            <input
              type="password"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full px-4 py-3 bg-slate-900/90 border border-indigo-500/20 text-white rounded-2xl shadow-sm shadow-indigo-950/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-500 transition"
            />

            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-3 rounded-2xl font-semibold shadow-xl shadow-indigo-500/20 hover:bg-indigo-400 transition duration-200"
            >
              Change Password
            </button>

            <div className="text-center text-red-400 text-sm mt-4">
              Don't have an account?{" "}
              <Link to="/register" className="text-indigo-600 hover:underline">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

