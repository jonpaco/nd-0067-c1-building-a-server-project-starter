import resize_image from '../utilities/resize_image';

describe('Test resizing various images.', () => {
  it('should return the default image', async () => {
    const file = await resize_image('fjord', 0, 0);
    expect(file).toBe('fjord.jpg');
  });

  it('should return not the default image', async () => {
    const file = await resize_image('fjord', 300, 200);
    expect(file).toContain('fjord');
  });

  it('should throw an error', async () => {
    try {
      await resize_image('penguin', 300, 200);
    } catch (err) {
      expect(err).toEqual({ message: 'Image not available' });
    }
  });
});
