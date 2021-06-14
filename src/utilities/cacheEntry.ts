// Each image gets associated with one of these.
class CacheEntry {
  height: number;
  width: number;
  descriptor: string;

  constructor(height: number, width: number, descriptor: string) {
    this.height = height;
    this.width = width;
    this.descriptor = descriptor;
  }
}

export default CacheEntry;
