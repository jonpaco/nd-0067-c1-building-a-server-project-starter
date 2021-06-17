import sharp from 'sharp'; // For resizing the image on the file system.
import CacheManager from './cacheManager'; // For handling the image cacheing.
import path from 'path'; // Used to joining paths together.

// Root image file path.
const rootPath = '../../images/';

// Create a new image cache.
const cache = new CacheManager();

// The endpoint used to re-size the image.
const resize_image = async (
  name: string,
  height: number,
  width: number
): Promise<string> => {
  // Check if we need to popluate the cache.
  if (cache.isEmpty()) {
    cache.loadCache();

    // If the cache is still empty after reading the file then create the default cache.
    if (cache.isEmpty()) {
      cache.createDefaultCache();
    }
  }

  // Check to make sure the image is one of the ones we support.
  if (!cache.isValidImageName(name)) {
    throw {
      message: 'Image not available'
    };
  }

  // Find the image entry in the cache.
  let [imageName, image] = cache.findMatch(height, width, name); // eslint-disable-line prefer-const

  // If the image was not already in the cache then create one.
  if (image === undefined) {
    // Create new cache entry space.
    image = cache.newEntry(height, width, name);

    // Create the output and the input path for the image.
    const outFilePath = path.join(
      __dirname + '/' + rootPath + image.descriptor
    );
    const inFilePath = path.join(
      __dirname + '/' + rootPath + imageName + '.jpg'
    );

    // Resize the image, otherwise bail.
    try {
      await sharp(inFilePath).resize(height, width).toFile(outFilePath);
    } catch (error) {
      throw 'Failed to resize image.';
    }
  }

  // Write the cache to disk.
  cache.flush();

  // Return the path for the image.
  return image.descriptor;
};

export default resize_image;
