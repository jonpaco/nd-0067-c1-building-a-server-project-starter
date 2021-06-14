import request from 'supertest';
import app from '../index';

describe('Test the verification on api routes', () => {
  it('should be a valid route with just an image name.', async () => {
    const result = await request(app).get('/api/resize/fjord').send();
    expect(result.status).toBe(200);
  });

  it('should be an invalid route with no image name', async () => {
    const result = await request(app).get('/api/resize/').send();
    expect(result.status).toBe(404);
  });

  it('should be a valid route with image name, height, and width', async () => {
    const result = await request(app)
      .get('/api/resize/fjord?width=200&height=200')
      .send();
    expect(result.status).toBe(200);
  });

  it('should be a valid route with image name and just width', async () => {
    const result = await request(app).get('/api/resize/fjord?width=200').send();
    expect(result.status).toBe(200);
  });

  it('should be a valid route with image name and just heigth', async () => {
    const result = await request(app)
      .get('/api/resize/fjord?height=200')
      .send();
    expect(result.status).toBe(200);
  });

  it('should be a valid route with image name and just heigth', async () => {
    const result = await request(app)
      .get('/api/resize/fjord?height=AAAAA')
      .send();
    expect(result.status).toBe(200);
  });
});
