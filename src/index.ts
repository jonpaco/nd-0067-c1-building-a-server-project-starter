import express from 'express'; // Gets the Express framework for routing http requests to endpoints.
import router from './router/router'; // The router for this application.
import path from 'path';

// Intantiate the express application interface.
const app = express();

// Choose our port to be something unique.
const port = 3003;

// Add the customing routing logic to the application.
app.use(express.static(path.join(__dirname, '../images')));
app.use('/api', router);
console.log(path.join(__dirname, '../images'));

// Start the server.
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}.`);
});

// Export the application for use by jasmine and supertest.
export default app;
