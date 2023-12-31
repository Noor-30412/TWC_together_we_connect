const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const userRoutes = require('./routings/userRoutes');
const authRoutes = require('./routings/authRoutes');
const protectedRoutes = require('./routings/protectedRoutes');
const buyerRoutes = require('./routings/buyerRoutes');
// const emailVerificationRoutes = require('./routings/emailVerificationRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Use express-session middleware
app.use(session({
  secret: process.env.SESSION_SECRET, // Set a secure session secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Set secure to true in production with HTTPS
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
app.use('/api/auth', authRoutes); // Use a different route for auth
app.use('/api', protectedRoutes);
app.use('/api/buyers', buyerRoutes);
// app.use('/api/auth/email-verification', emailVerificationRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
