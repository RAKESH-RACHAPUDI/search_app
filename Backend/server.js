const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const searchRoutes = require('./routes/search');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000',
  'https://search-app-q8pv.vercel.app',  // Add your Vercel domain
  'https://search-app-cmd2.vercel.app'   // Added frontend URL to fix CORS
];

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI.includes('mongodb+srv') ?
  process.env.MONGODB_URI :
  process.env.MONGODB_URI.replace('localhost', '127.0.0.1');

mongoose.connect(mongoUri)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', searchRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
