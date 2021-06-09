import request from 'supertest';
import app from '../index';

describe('Test the verification on api routes', () => {
  it('should validate the image before processing it.', async () => {
    const result = await request(app).get('/api/resize/fjord').send();
    expect(result.status).toBe(200);
  });
});
