const express = require('express');
const { connect } = require('./config/database');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Call the connect function
connect();

// Middlewares
app.use(express.json());

// Routes
app.use('/users', userRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
