//server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const userRoutes = require('./routings/userRoutes');
const authRoutes = require('./routings/authRoutes');
const protectedRoutes = require('./routings/protectedRoutes');
const buyerRoutes = require('./routings/buyerRoutes');
const sellerRoutes = require('./routings/sellerRoutes');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const buyerDocumentRoutes = require('./routings/buyerDocumentRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure multer for handling file uploads
const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage: storage });

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
}));

// MongoDB Connection
async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

connectToMongoDB();

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);
app.use('/api/buyers', buyerRoutes);
app.use('/api/sellers', sellerRoutes);
app.use('/api/buyer', buyerDocumentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong in Middleware!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

// Standalone error-handling middleware
app.use((err, req, res, next) => {
  console.error('Unexpected error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port: ${PORT}`);
// });
