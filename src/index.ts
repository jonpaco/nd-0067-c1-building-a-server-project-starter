import express from 'express'; // Gets the Express framework for routing http requests to endpoints.
import router from './router/router'; // The router for this application.
import path from 'path'; // To get the aboslute path to certain elements in the system.

// Intantiate the express application interface.
const app = express();

// Choose our port to be something unique.
const port = 3003;

// Add the customing routing logic to the application.
app.use('/api', router);

// Serve of the static images and style sheet for our application.
app.use(express.static(path.join(__dirname, '../images')));
app.use(express.static(path.join(__dirname, '../style')));

// Start the server.
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}.`);
});

// Export the application for use by jasmine and supertest.
export default app;
