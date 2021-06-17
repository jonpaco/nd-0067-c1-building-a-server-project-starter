import express from 'express'; // Gets the Express framework for routing http requests to endpoints.
import resize_image from '../../utilities/resize_image'; // Api used to resize the picture.
import buildHtml from '../../template/view'; // The HTML template for displaying the image.

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

// The route to access the image.
resize.get(
  '/:image',
  async (
    req: express.Request<ResizeBody, ResizeQuery>,
    res: express.Response,
    next: express.NextFunction
  ) => {
    // Get the route parameter for the image name.
    const path = req.params.image;

    // Check if a width was sent.
    let width = Number(req.query.width);
    if (!width) {
      width = 0;
    }

    // Check if a height was sent.
    let height = Number(req.query.height);
    if (!height) {
      height = 0;
    }

    // If either height or width are missing then make the image a square.
    if (height === 0 && width !== 0) {
      height = width;
    }

    // If either height or width are missing then make the image a square.
    if (width === 0 && height !== 0) {
      width = height;
    }

    // Attempt to resize the image
    let image_result = '';
    try {
      image_result = await resize_image(path, height, width);
    } catch (err) {
      // If we fail tell the user no image was found.
      return next(err);
    }

    // Make sure we got a valid image back and return to user.
    if (image_result) {
      res.send(buildHtml(image_result));
    } else {
      // Here to handle a strange edge case.
      res.status(404).send('Image Not Found.');
    }
  }
);

// Provide the router to external modules.
export default resize;
