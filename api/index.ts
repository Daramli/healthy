import express from 'express';
import { registerRoutes } from '../server/routes';

const app = express();

// Middleware
app.use(express.json());

// Register routes
registerRoutes(app);

// Export the Express app
export default app; 