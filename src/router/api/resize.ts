import express from 'express'; // Gets the Express framework for routing http requests to endpoints.
import resize_image from '../../utilities/resize_image';
import path from 'path';

// Create the application router to add the end point to.
const resize = express.Router();

// Define the types for the request body.
interface ResizeBody {
  image: string;
}

// Define the types for the request query.
interface ResizeQuery {
  height: number;
  width: number;
}

// Add the resize api to the routing endpoints to be exported.
const buildHtml = (path: string): string => {
  const template = `
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Resize Image Template</title>
  </head>

  <body>
  <img src="/${path}">
  </body>
  </html>
  `;
  return template;
};

resize.get(
  '/:image',
  async (
    req: express.Request<ResizeBody, ResizeQuery>,
    res: express.Response
  ) => {
    const path = req.params.image;

    let width = Number(req.query.width);
    if (!width) {
      width = 0;
    }

    let height = Number(req.query.height);
    if (!height) {
      height = 0;
    }

    if (height === 0 && width !== 0) {
      height = width;
    }

    if (width === 0 && height !== 0) {
      width = height;
    }

    let image_result = '';
    try {
      image_result = await resize_image(path, height, width);
    } catch (err) {
      console.log('No Image Found');
    }

    if (image_result) {
      res.send(buildHtml(image_result));
    } else {
      res.status(404).send('Image Not Found....');
    }
  }
);

// Provide the router to external modules.
export default resize;
