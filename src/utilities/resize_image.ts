import sharp from 'sharp'; // For resizing the image on the file system.
import CacheManager from './cacheManager'; // For handling the image caching.
import path from 'path'; // Used to joining paths together.
import fs from 'fs'; // For checking that the file exists.
import ImageCache from './imageCache';
import CacheEntry from './cacheEntry';

// Root image file path.
const rootPath = '../../images/';

// Create a new image cache.
const cache = new CacheManager();

const handle_existing_image = async (
  image: CacheEntry,
  imageName: string
): Promise<CacheEntry> => {
  // The image already exists so lets double check its on the filesystem.
  const exists = fs.existsSync(__dirname + '/' + rootPath + image.descriptor);

  if (exists === false) {
    // Create the output and the input path for the image.
    const outFilePath = path.join(
      __dirname + '/' + rootPath + image.descriptor
    );
    const inFilePath = path.join(
      __dirname + '/' + rootPath + imageName + '.jpg'
    );

    // Resize the image, otherwise bail.
    try {
      await sharp(inFilePath)
        .resize(image.height, image.width)
        .toFile(outFilePath);
    } catch (error) {
      throw 'Failed to resize image.';
    }
  }
  return image;
};

const handle_new_size = async (
  imageName: string,
  height: number,
  width: number,
  name: string
): Promise<CacheEntry> => {
  // Create new cache entry space.
  const image = cache.newEntry(height, width, name);

  // Create the output and the input path for the image.
  const outFilePath = path.join(__dirname + '/' + rootPath + image.descriptor);
  const inFilePath = path.join(__dirname + '/' + rootPath + imageName + '.jpg');

  // Resize the image, otherwise bail.
  try {
    await sharp(inFilePath)
      .resize(image.height, image.width)
      .toFile(outFilePath);
  } catch (error) {
    throw 'Failed to resize image.';
  }
  return image;
};

// The endpoint used to re-size the image.
const resize_image = async (
  name: string,
  height: number,
  width: number
): Promise<string> => {
  // Check if we need to populate the cache.
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

  try {
    // If the image was not already in the cache then create one.
    if (image === undefined) {
      image = await handle_new_size(imageName, height, width, name);
    } else {
      image = await handle_existing_image(image, imageName);
    }
  } catch (err) {
    throw {
      message: 'Failure to handle image.'
    };
  }

  // Write the cache to disk.
  cache.flush();

  // Return the path for the image.
  return image.descriptor;
};

export default resize_image;
