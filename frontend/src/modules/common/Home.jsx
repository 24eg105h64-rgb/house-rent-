import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import p1 from "../../images/p1.jpg";
import p2 from "../../images/p2.jpg";
import p3 from "../../images/p3.jpg";
import p4 from "../../images/p4.jpg";
import AllPropertiesCards from "../user/AllPropertiesCards";

const images = [p1, p2, p3, p4];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/40 backdrop-blur-xl border-b border-slate-700/40 py-4 px-8 flex justify-between items-center shadow-2xl shadow-indigo-950/20">
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
            className="text-slate-950 bg-indigo-400 px-4 py-2 rounded-full shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 transition"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative w-full h-[70vh] mt-16 overflow-hidden">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`absolute w-full h-full transition-opacity duration-1000 ${currentIndex === idx ? "opacity-100" : "opacity-0"
              }`}
          >
            <img src={img} alt={`Slide ${idx}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          </div>
        ))}

        {/* Center Text */}
        <div className="absolute bottom-20 w-full text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg mb-4 animate-fadeIn">
            Find Your Dream Rental Property
          </h1>
          <p className="text-lg md:text-xl font-light drop-shadow-md text-gray-200">
            Comfort, Convenience & Class — All in One Place
          </p>
        </div>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${currentIndex === idx
                  ? "bg-indigo-400 scale-125 shadow-lg"
                  : "bg-gray-400 hover:bg-indigo-300"
                }`}
            ></button>
          ))}
        </div>
      </div>

      {/* Properties Section */}
      <div className="max-w-7xl mx-auto w-full py-20 px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 p-10 shadow-2xl shadow-indigo-950/20 backdrop-blur-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,_102,_241,_0.24),_transparent_30%),_radial-gradient(circle_at_bottom_right,_rgba(168,_85,_247,_0.18),_transparent_22%)]"></div>
          <div className="relative text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
              Explore Our Premium Properties
            </h1>
            <p className="text-slate-300 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
              Looking to post your property? Create a listing in minutes and connect with quality renters across the city.
            </p>
            <div className="mt-8 inline-flex rounded-full bg-slate-950/90 border border-indigo-500/20 shadow-lg shadow-indigo-950/10">
              <Link
                to="/register"
                className="px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300 hover:text-white hover:bg-indigo-500/90 rounded-full transition"
              >
                Register as Owner
              </Link>
            </div>
          </div>
        </div>

        {/* Property Cards */}
        <div className="mt-12">
          <AllPropertiesCards />
        </div>
      </div>
    </div>

  );
};

export default Home;
