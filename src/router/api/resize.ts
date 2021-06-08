import express from 'express'; // Gets the Express framework for routing http requests to endpoints.

// Create the application router to add the end point to.
const resize = express.Router();

// Add the resize api to the routing endpoints to be exported.
resize.get('/', (req: express.Request, res: express.Response) => {
  res.send('Here is your endpoint!');
});

// Provide the router to external modules.
export default resize;
