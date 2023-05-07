const express = require('express');
const app = express();
const { connect } = require('./config/database');
require('dotenv').config();

// Call the connect function
connect();

// Add middleware and routes here

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
