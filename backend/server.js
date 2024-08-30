const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
const userRoutes = require('./routes/userRoutes');  // Ensure this path is correct
app.use('/api/users', userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
