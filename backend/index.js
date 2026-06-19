const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connect.js");
const propertySchema = require("./models/PropertySchema");

const app = express();

//////dotenv config/////////////////////
dotenv.config();


const PORT = process.env.PORT || 8001;


app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/api/user', require('./routes/userRoutes.js'))
app.use('/api/admin', require('./routes/adminRoutes'))
app.use('/api/owner', require('./routes/ownerRoutes'))
app.use('/api/sample', require('./routes/sampleRoutes'))

app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'RentEase backend is running' });
});




const seedSampleProperties = async () => {
  const count = await propertySchema.countDocuments();
  if (count === 0) {
    const sampleProperties = [
      {
        propertyType: "house",
        propertyAdType: "rent",
        propertyAddress: "1483 Willow Lane, Greenfield",
        ownerContact: "+1 555 123 4456",
        propertyAmt: 1800,
        isAvailable: "Available",
        additionalInfo: "3-bedroom house with large backyard and parking space.",
        ownerName: "Emma Parker",
        propertyImage: [
          {
            filename: "brick-house.jpg",
            path: "/uploads/brick-house.jpg",
          },
        ],
      },
      {
        propertyType: "villa",
        propertyAdType: "rent",
        propertyAddress: "22 Lakeside Drive, Brookmeadow",
        ownerContact: "+1 555 987 1122",
        propertyAmt: 2700,
        isAvailable: "Available",
        additionalInfo: "Modern 4-bedroom villa with lake view and swimming pool.",
        ownerName: "Nishant Rao",
        propertyImage: [
          {
            filename: "modern-white-house.jpg",
            path: "/uploads/modern-white-house.jpg",
          },
        ],
      },
      {
        propertyType: "residential",
        propertyAdType: "rent",
        propertyAddress: "79 Elm Street, Rosewood",
        ownerContact: "+1 555 332 7788",
        propertyAmt: 1450,
        isAvailable: "Available",
        additionalInfo: "Cozy 2-bedroom home near shops and transit.",
        ownerName: "Sophie Kim",
        propertyImage: [
          {
            filename: "gray-white-house.jpg",
            path: "/uploads/gray-white-house.jpg",
          },
        ],
      },
    ];

    await propertySchema.insertMany(sampleProperties);
    console.log(`Seeded ${sampleProperties.length} sample properties`);
  }
};

connectDB()
  .then(async () => {
    await seedSampleProperties();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  });