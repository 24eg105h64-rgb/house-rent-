import axios from "../../apiConfig";
import React, { useState, useEffect } from "react";
import Toast from "../common/Toast";


const AllPropertiesCards = ({ loggedIn }) => {
  const [allProperties, setAllProperties] = useState([]);
  const [filterPropertyType, setPropertyType] = useState("");
  const [filterPropertyAdType, setPropertyAdType] = useState("");
  const [filterPropertyAddress, setPropertyAddress] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [userDetails, setUserDetails] = useState({ fullName: "", phone: "" });
  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
  };

  const getAllProperties = async () => {
    try {
      const res = await axios.get("/api/user/getAllProperties");
      setAllProperties(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBooking = async (status, propertyId, ownerId) => {
    try {
      const res = await axios.post(`/api/user/bookinghandle/${propertyId}`, { userDetails, status, ownerId });

      if (res.data.success) {
        showToast(res.data.message);
        setShowModal(false);
      } else {
        showToast(res.data.message);
      }
    } catch (error) {
      console.log(error);
      showToast("Booking failed");
    }
  };

  useEffect(() => {
    getAllProperties();
  }, []);

  const filteredProperties = allProperties
    .filter(
      (property) =>
        filterPropertyAddress === "" ||
        property.propertyAddress
          .toLowerCase()
          .includes(filterPropertyAddress.toLowerCase())
    )
    .filter(
      (property) =>
        filterPropertyAdType === "" ||
        property.propertyAdType
          .toLowerCase()
          .includes(filterPropertyAdType.toLowerCase())
    )
    .filter(
      (property) =>
        filterPropertyType === "" ||
        property.propertyType
          .toLowerCase()
          .includes(filterPropertyType.toLowerCase())
    );

  const openModal = (property) => {
    setSelectedProperty(property);
    setShowModal(true);
  };

  return (
    <div className="p-6 text-white animate-fade-in-up">
      {toast.show && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      {/* Filters */}
      <div className="flex gap-4 items-center mb-6">
        <input
          type="text"
          placeholder="Search by Address"
          value={filterPropertyAddress}
          onChange={(e) => setPropertyAddress(e.target.value)}
          className="bg-gray-800/70 border border-gray-700 p-2 rounded w-1/3 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
        />
        <select
          value={filterPropertyAdType}
          onChange={(e) => setPropertyAdType(e.target.value)}
          className="bg-gray-800/70 border border-gray-700 p-2 rounded text-white focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Ad Types</option>
          <option value="sale">Sale</option>
          <option value="rent">Rent</option>
        </select>
        <select
          value={filterPropertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="bg-gray-800/70 border border-gray-700 p-2 rounded text-white focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Types</option>
          <option value="commercial">Commercial</option>
          <option value="land/plot">Land/Plot</option>
          <option value="residential">Residential</option>
        </select>
      </div>

      {/* Property Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <div
              key={property._id}
              className="bg-slate-950/95 border border-indigo-500/10 rounded-[2rem] shadow-[0_20px_60px_-30px_rgba(56,189,248,0.65)] hover:shadow-[0_25px_70px_-35px_rgba(99,102,241,0.65)] transition-transform duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  src={`${process.env.VITE_API_URL || "http://localhost:8001"}${property.propertyImage[0]?.path}`}
                  alt="Property"
                  className="w-full h-44 object-cover brightness-90 hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-xl text-white mb-1">{property.propertyAddress}</h3>
                <p className="text-slate-400 text-sm mb-4">
                  {property.propertyType} · {property.propertyAdType}
                </p>
                {loggedIn && (
                  <div className="space-y-2 text-sm text-slate-300 mb-4">
                    <p>
                      <span className="font-semibold text-slate-100">Owner:</span> {property.ownerContact}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-100">Availability:</span> {property.isAvailable}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-100">Price:</span> ₹{property.propertyAmt}
                    </p>
                  </div>
                )}
                {property.isAvailable === "Available" ? (
                  loggedIn ? (
                    <button
                      onClick={() => openModal(property)}
                      className="mt-3 w-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white py-3 rounded-2xl font-semibold shadow-xl shadow-indigo-500/20 hover:from-indigo-400 hover:to-violet-400 transition"
                    >
                      Get Info / Book
                    </button>
                  ) : (
                    <p className="mt-2 text-amber-300 text-xs font-medium">
                      Login to see details
                    </p>
                  )
                ) : (
                  <p className="mt-2 text-red-400 text-xs font-medium">Not Available</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-slate-400">No properties available at the moment.</p>
        )}
      </div>

      {/* Booking Modal */}
      {showModal && selectedProperty && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 backdrop-blur-sm">
          <div className="bg-gray-900 p-6 rounded-lg w-full max-w-2xl relative border border-gray-700 shadow-xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              ✖
            </button>
            <h3 className="text-xl font-bold mb-4 text-white">Property Info</h3>
            <img
              src={`${process.env.VITE_API_URL || "http://localhost:8001"}${selectedProperty.propertyImage[0]?.path}`}
              alt="Property"
              className="w-full h-48 object-cover rounded mb-4"
            />
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
              <div>
                <p>
                  <b>Owner Contact:</b> {selectedProperty.ownerContact}
                </p>
                <p>
                  <b>Availability:</b> {selectedProperty.isAvailable}
                </p>
                <p>
                  <b>Price:</b> ₹{selectedProperty.propertyAmt}
                </p>
              </div>
              <div>
                <p>
                  <b>Location:</b> {selectedProperty.propertyAddress}
                </p>
                <p>
                  <b>Type:</b> {selectedProperty.propertyType}
                </p>
                <p>
                  <b>Ad Type:</b> {selectedProperty.propertyAdType}
                </p>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-300">
              <b>Additional Info:</b> {selectedProperty.additionalInfo}
            </p>

            {/* Booking Form */}
            <form
              className="mt-4 space-y-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleBooking("pending", selectedProperty._id, selectedProperty.ownerId);
              }}
            >
              <input
                type="text"
                name="fullName"
                placeholder="Your Full Name"
                required
                className="bg-gray-800 border border-gray-700 p-2 w-full rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
                value={userDetails.fullName}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, fullName: e.target.value })
                }
              />
              <input
                type="number"
                name="phone"
                placeholder="Phone Number"
                required
                className="bg-gray-800 border border-gray-700 p-2 w-full rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
                value={userDetails.phone}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, phone: e.target.value })
                }
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
              >
                Book Property
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPropertiesCards;
