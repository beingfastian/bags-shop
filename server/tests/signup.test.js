import request from 'supertest';
import app from '../app/app.ts';

describe('POST /user/register', () => {
  it('should return 201 for successful signup', async () => {
    const response = await request(app).post('/user/register').send({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe1277@example.com',
      password: 'testpassword',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      'message',
      'User registered successfully'
    );
  });

  it('should return 400 for missing fields', async () => {
    const response = await request(app).post('/user/register').send({
      firstName: 'John',
      lastName: 'Doe',
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'All fields are required');
  });
});
