const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connect.js");

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




app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});