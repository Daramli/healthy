const express = require('express');
const app = express();

// Import your routes
const { registerRoutes } = require('../server/routes');

// Middleware
app.use(express.json());

// Register routes
registerRoutes(app);

// Export the Express app
module.exports = app; 