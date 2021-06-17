import fs from 'fs'; // For file system operations related to the image.
import ImageCache from './imageCache'; // A wrapper for each image type that is supported by the cache.
import CacheEntry from './cacheEntry'; // A wrapper for each image file that is in the cache.

// Defautl images.
const defaultImages = [
  'encenadaport',
  'fjord',
  'icelandwaterfall',
  'palmtunnel',
  'santamonica'
];

// Image cache file.
const cacheFile = './cache.json';

// File extension
const fileExtension = '.jpg';

// This is the top level of associations between the images.
class CacheManager {
  association: ImageCache[];

  constructor() {
    this.association = [];
  }

  loadCache(): void {
    // Get the cache file.
    const cacheData = fs.readFileSync(cacheFile, { flag: 'a+' });
    try {
      this.association = (
        JSON.parse(cacheData.toString()) as CacheManager
      ).association;
    } catch (err) {
      console.log('File Data Not Found');
    }
  }

  isEmpty(): boolean {
    return this.association.length === 0;
  }

  createDefaultCache(): void {
    console.log('Creating Cache');

    defaultImages.forEach((element) => {
      const imageEntry = new ImageCache(element);

      const filePath = element + fileExtension;
      const entry = new CacheEntry(0, 0, filePath);

      imageEntry.entries.push(entry);
      this.association.push(imageEntry);
    });

    fs.writeFile(cacheFile, JSON.stringify(this, null, 2), '', (err) => {
      if (err) {
        throw err;
      }
    });
  }

  findMatch(
    height: number,
    width: number,
    name: string
  ): [string, CacheEntry | undefined] {
    let imageCache = this.association.find((entry: ImageCache): boolean => {
      return entry.image === name;
    });

    imageCache = imageCache === undefined ? new ImageCache('') : imageCache;

    const cacheEntry = imageCache?.entries.find(
      (entry: CacheEntry): boolean => {
        const matchHeight = entry.height === height || height === 0;
        const matchWidth = entry.width === width || width === 0;
        return matchHeight && matchWidth;
      }
    );

    return [imageCache.image, cacheEntry];
  }

  isValidImageName(name: string): boolean {
    return defaultImages.includes(name);
  }

  newEntry(height: number, width: number, name: string): CacheEntry {
    const imageCache = this.association.find((entry: ImageCache): boolean => {
      return entry.image === name;
    });

    if (imageCache === undefined) {
      throw 'Cache Corruption';
    }

    const fileName =
      `${imageCache.image}` + `${imageCache.entries.length}` + fileExtension;

    const newEntry = new CacheEntry(height, width, fileName);
    imageCache.entries.push(newEntry);

    return newEntry;
  }

  flush(): void {
    fs.writeFile(cacheFile, JSON.stringify(this, null, 2), '', (err) => {
      if (err) {
        throw err;
      }
    });
  }
}

export { CacheManager as default, defaultImages, fileExtension };
