import express from 'express'; // Gets the Express framework for routing http requests to endpoints.
import resize from './api/resize'; // Api to resize images.

// Create the application router to add the end point to.
const router = express.Router();

// Add the resize api to the routing endpoints to be exported.
router.use('/resize', resize);

// Provide the router to external modules.
export default router;
