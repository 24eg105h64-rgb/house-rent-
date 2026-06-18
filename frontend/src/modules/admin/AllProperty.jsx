import React, { useState, useEffect } from "react";
import axios from "../../apiConfig";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const AdminAllProperty = () => {
  const [allProperties, setAllProperties] = useState([]);
  const navigate = useNavigate();

  const getAllProperty = async () => {
    try {
      const response = await axios.get("/api/admin/getallproperties");

      if (response.data.success) {
        setAllProperties(response.data.data);
      } else {
        message.error(response.data.message || "Unauthorized access");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        message.error("Session expired, please login again");
        navigate("/login");
      } else {
        message.error("Failed to fetch Property");
      }
    }
  };

  useEffect(() => {
    getAllProperty();
  }, []);

  return (
    <div className="overflow-x-auto mt-6 rounded-[2rem] border border-indigo-500/10 bg-slate-950/90 shadow-[0_30px_70px_-35px_rgba(15,23,42,0.9)] backdrop-blur-2xl p-4">
      <table className="min-w-full border border-indigo-500/10 bg-slate-950/80 backdrop-blur-xl rounded-[1.75rem] overflow-hidden">
        <thead className="bg-gradient-to-r from-indigo-500/80 to-violet-500/70 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Property ID</th>
            <th className="py-3 px-4 text-center">Owner ID</th>
            <th className="py-3 px-4 text-center">Property Type</th>
            <th className="py-3 px-4 text-center">Property Ad Type</th>
            <th className="py-3 px-4 text-center">Property Address</th>
            <th className="py-3 px-4 text-center">Owner Contact</th>
            <th className="py-3 px-4 text-center">Property Amt</th>
          </tr>
        </thead>
        <tbody>
          {allProperties.length > 0 ? (
            allProperties.map((property, index) => (
              <tr
                key={property._id}
                className={`transition duration-200 ${index % 2 === 0 ? "bg-slate-800/50" : "bg-slate-900/50"
                  } hover:bg-indigo-500/20`}
              >
                <td className="py-2 px-4 border-b border-slate-700 text-slate-200">
                  {property._id}
                </td>
                <td className="py-2 px-4 border-b border-slate-700 text-center text-slate-300">
                  {property.ownerId}
                </td>
                <td className="py-2 px-4 border-b border-slate-700 text-center text-indigo-400 font-medium">
                  {property.propertyType}
                </td>
                <td className="py-2 px-4 border-b border-slate-700 text-center text-slate-300">
                  {property.propertyAdType || "N/A"}
                </td>
                <td className="py-2 px-4 border-b border-slate-700 text-center text-slate-300">
                  {property.propertyAddress}
                </td>
                <td className="py-2 px-4 border-b border-slate-700 text-center text-slate-300">
                  {property.ownerContact}
                </td>
                <td className="py-2 px-4 border-b border-slate-700 text-center font-semibold text-green-400">
                  ₹{property.propertyAmt}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                className="text-center py-6 text-slate-400 font-medium italic"
              >
                No properties found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAllProperty;
