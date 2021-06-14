import sharp from 'sharp'; // For resizing the image on the file system.
import CacheManager from './cacheManager';
import path from 'path';
import fs from 'fs';
import CacheEntry from './cacheEntry';

// Root image file path.
const rootPath = '../../images/';

const cache = new CacheManager();

const resize_image = async (
  name: string,
  height: number,
  width: number
): Promise<string> => {
  // Check if we need to popluate the cache.
  if (cache.isEmpty()) {
    cache.loadCache();

    if (cache.isEmpty()) {
      cache.createDefaultCache();
    }
  }

  if (!cache.isValidImageName(name)) {
    throw 'Image not available';
  }

  let [imageName, image] = cache.findMatch(height, width, name);

  if (image === undefined) {
    image = cache.newEntry(height, width, name);

    const outFilePath = path.join(
      __dirname + '/' + rootPath + image.descriptor
    );
    const inFilePath = path.join(
      __dirname + '/' + rootPath + imageName + '.jpg'
    );
    try {
      await sharp(inFilePath).resize(height, width).toFile(outFilePath);
    } catch (error) {
      throw 'Failed to resize image.';
    }
  }

  cache.flush();

  return image.descriptor;
};

export default resize_image;
