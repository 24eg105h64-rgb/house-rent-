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

  const statItems = [
    { label: "Verified Listings", value: "1,250+" },
    { label: "Trusted Owners", value: "420+" },
    { label: "Instant Bookings", value: "98%" },
  ];

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
      <div className="relative w-full min-h-[72vh] mt-16 overflow-hidden">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1200 ${currentIndex === idx ? "opacity-100" : "opacity-0"}`}
          >
            <img src={img} alt={`Slide ${idx}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/20 to-transparent" />
          </div>
        ))}

        <div className="absolute inset-0 hero-overlay" />

        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="relative max-w-4xl w-full rounded-[2rem] border border-white/10 bg-slate-950/75 p-10 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.95)] backdrop-blur-xl">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-indigo-500/10 via-transparent to-violet-500/10 pointer-events-none" />
            <div className="relative text-center">
              <p className="uppercase tracking-[0.32em] text-xs text-indigo-300/70 mb-4">
                Trusted rentals, built for modern living
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5">
                Discover premium rental properties with effortless booking.
              </h1>
              <p className="mx-auto max-w-2xl text-slate-300 text-base md:text-lg leading-relaxed mb-8">
                Browse curated homes, get instant owner info, and book with confidence across apartments, commercial spaces, and land plots.
              </p>
              <div className="inline-flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="#properties"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-8 py-3 text-white font-semibold shadow-xl shadow-indigo-500/20 hover:from-indigo-400 hover:to-violet-400 transition"
                >
                  Explore Properties
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-3 text-white/90 font-medium hover:bg-white/10 transition"
                >
                  List Your Property
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === idx ? "bg-indigo-400 shadow-[0_0_0_8px_rgba(99,102,241,0.12)]" : "bg-slate-400/60 hover:bg-indigo-300"}`}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full py-14 px-6">
        <div className="grid gap-5 md:grid-cols-3 mb-10">
          {statItems.map((item) => (
            <div key={item.label} className="glass-panel p-6 rounded-[1.75rem] border border-indigo-500/10 shadow-[0_30px_80px_-50px_rgba(99,102,241,0.35)]">
              <p className="text-sm uppercase tracking-[0.3em] text-indigo-300/80 mb-3">
                {item.label}
              </p>
              <p className="text-3xl md:text-4xl font-extrabold text-white">
                {item.value}
              </p>
            </div>
          ))}
        </div>

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
        <div className="mt-12" id="properties">
          <AllPropertiesCards />
        </div>
      </div>
    </div>

  );
};

export default Home;
