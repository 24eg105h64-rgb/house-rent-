const express = require("express");
const router = express.Router();

router.get("/status", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Sample API route is active",
    timestamp: new Date().toISOString(),
  });
});

router.get("/properties", (req, res) => {
  const sampleProperties = [
    {
      id: 1,
      title: "Modern Studio in Downtown",
      location: "Oakwood Avenue, Springfield",
      price: 1050,
      bedrooms: 1,
      bathrooms: 1,
      type: "Renter",
    },
    {
      id: 2,
      title: "Family Home with Garden",
      location: "Maple Street, Brookside",
      price: 2175,
      bedrooms: 3,
      bathrooms: 2,
      type: "Owner",
    },
  ];

  res.status(200).json({ success: true, data: sampleProperties });
});

module.exports = router;
