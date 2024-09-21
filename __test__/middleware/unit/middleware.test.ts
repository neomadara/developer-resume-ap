import request from 'supertest';
import express from 'express';
import jwt from 'jsonwebtoken';
import authenticateJWT from '../../../src/middleware/authenticateJWT';
import config from '../../../config';

const app = express();
app.use(express.json());

app.get('/protected', authenticateJWT, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

describe('authenticateJWT Middleware', () => {
  it('should return 401 if no token is provided', async () => {
    const res = await request(app).get('/protected');
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Unauthorized: Missing token');
  });

  it('should return 403 if token is invalid', async () => {
    const res = await request(app)
      .get('/protected')
      .set('Authorization', 'Bearer invalidtoken');
    expect(res.status).toBe(403);
    expect(res.body.message).toBe('Forbidden: Invalid or expired token');
  });

  it('should return 200 if token is valid', async () => {
    const token = jwt.sign({ userId: 'testuser' }, config.JWT_SECRET, { expiresIn: '1h' });
    const res = await request(app)
      .get('/protected')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('This is a protected route');
  });
});
