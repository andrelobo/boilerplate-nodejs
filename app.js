const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const userRoutes = require('./routes/userRoutes');

const app = express();

// middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// routes
app.use('/users', userRoutes);

// error handler middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
