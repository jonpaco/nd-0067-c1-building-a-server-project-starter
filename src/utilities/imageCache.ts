import CacheEntry from './cacheEntry';

// This is the container of specific images.
class ImageCache {
  image: string;
  entries: CacheEntry[];

  constructor(image: string) {
    this.image = image;
    this.entries = [];
  }

  addEntry(entry: CacheEntry): void {
    this.entries.push(entry);
  }
}

export default ImageCache;
