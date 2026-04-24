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

describe('Calculate Subtract Endpoint', () => {
  test('10 dan 3 ni ayirishi kerak', async () => {
    const res = await request(app)
      .post('/calculate/subtract')
      .send({ a: 10, b: 3 });
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(7);
  });

  test('Manfiy natija chiqishi kerak', async () => {
    const res = await request(app)
      .post('/calculate/subtract')
      .send({ a: 3, b: 10 });
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(-7);
  });

  test('Noto\'g\'ri input 400 qaytarishi kerak', async () => {
    const res = await request(app)
      .post('/calculate/subtract')
      .send({ a: 'salom', b: 3 });
    expect(res.statusCode).toBe(400);
  });
});

describe('Calculate Divide Endpoint', () => {
  test('10 ni 2 ga bo\'lishi kerak', async () => {
    const res = await request(app)
      .post('/calculate/divide')
      .send({ a: 10, b: 2 });
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(5);
  });

  test('Nolga bo\'lish 400 qaytarishi kerak', async () => {
    const res = await request(app)
      .post('/calculate/divide')
      .send({ a: 10, b: 0 });
    expect(res.statusCode).toBe(400);
  });

  test('Noto\'g\'ri input 400 qaytarishi kerak', async () => {
    const res = await request(app)
      .post('/calculate/divide')
      .send({ a: 'salom', b: 2 });
    expect(res.statusCode).toBe(400);
  });
});