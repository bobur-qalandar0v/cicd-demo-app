// tests/app.test.js - Jest + Supertest bilan testlar
const request = require('supertest');
const app = require('../src/app');

describe('Health Endpoint', () => {
  test('GET /health 200 qaytarishi kerak', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('OK');
    expect(res.body.timestamp).toBeDefined();
  });
});

describe('Calculate Add Endpoint', () => {
  test('Ikki sonni qo\'shishi kerak', async () => {
    const res = await request(app)
      .post('/calculate/add')
      .send({ a: 5, b: 3 });
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(8);
    expect(res.body.operation).toBe('add');
  });

  test('Manfiy sonlar bilan ishlashi kerak', async () => {
    const res = await request(app)
      .post('/calculate/add')
      .send({ a: -5, b: 3 });
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(-2);
  });

  test('Noto\'g\'ri kiritish 400 qaytarishi kerak', async () => {
    const res = await request(app)
      .post('/calculate/add')
      .send({ a: 'salom', b: 3 });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
  });
});

describe('Calculate Multiply Endpoint', () => {
  test('Ikki sonni ko\'paytirishi kerak', async () => {
    const res = await request(app)
      .post('/calculate/multiply')
      .send({ a: 4, b: 7 });
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(28);
  });

  test('Nolga ko\'paytirishda 0 qaytarishi kerak', async () => {
    const res = await request(app)
      .post('/calculate/multiply')
      .send({ a: 100, b: 0 });
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(0);
  });
});
