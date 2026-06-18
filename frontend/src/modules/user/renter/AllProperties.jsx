import React, { useState, useEffect } from "react";
import axios from "../../../apiConfig";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const RenterAllProperty = () => {
  const [allProperties, setAllProperties] = useState([]);
  const navigate = useNavigate();

  const getAllProperty = async () => {
    try {
      const response = await axios.get("/api/user/getallbookings");

      if (response.data.success) {
        setAllProperties(response.data.data);
      } else {
        message.error(response.data.message);
        navigate("/login")
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        message.error("Session expired, please login again");
        navigate("/login");
      } else {
        message.error("Failed to fetch properties");
      }
    }
  };

  useEffect(() => {
    getAllProperty();
  }, []);

  return (
    <div className="overflow-x-auto bg-slate-950/90 backdrop-blur-2xl border border-indigo-500/10 shadow-[0_30px_70px_-35px_rgba(15,23,42,0.9)] rounded-[2rem] p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-indigo-300">All My Bookings</h2>
      </div>
      <table className="min-w-full border border-indigo-500/10 text-sm rounded-[1.5rem] overflow-hidden">
        <thead className="bg-gradient-to-r from-indigo-500/80 to-violet-500/70 text-white">
          <tr>
            <th className="px-4 py-2 border-b border-slate-700 text-left">Booking ID</th>
            <th className="px-4 py-2 border-b border-slate-700 text-left">Property ID</th>
            <th className="px-4 py-2 border-b border-slate-700 text-center">Tenant Name</th>
            <th className="px-4 py-2 border-b border-slate-700 text-center">Phone</th>
            <th className="px-4 py-2 border-b border-slate-700 text-center">Booking Status</th>
          </tr>
        </thead>
        <tbody>
          {allProperties.length > 0 ? (
            allProperties.map((booking, index) => (
              <tr
                key={booking._id}
                className={`${index % 2 === 0 ? "bg-slate-800/60" : "bg-slate-900/50"
                  } hover:bg-slate-800 transition-colors`}
              >
                <td className="px-4 py-2 border-b border-slate-700 text-slate-200">{booking._id}</td>
                <td className="px-4 py-2 border-b border-slate-700 text-slate-200">{booking.propertyId}</td>
                <td className="px-4 py-2 border-b border-slate-700 text-center text-slate-200">
                  {booking.userName}
                </td>
                <td className="px-4 py-2 border-b border-slate-700 text-center text-slate-200">
                  {booking.phone}
                </td>
                <td
                  className={`px-4 py-2 border-b border-slate-700 text-center font-semibold ${booking.bookingStatus === "booked"
                    ? "text-green-400"
                    : "text-yellow-400"
                    }`}
                >
                  {booking.bookingStatus}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="text-center py-4 text-slate-400 font-medium"
              >
                No bookings found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RenterAllProperty;

