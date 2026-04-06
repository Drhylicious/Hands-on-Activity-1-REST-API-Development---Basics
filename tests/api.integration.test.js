const request = require('supertest');
const app = require('../server');
const dbHelper = require('./dbHelper');
const Dish = require('../src/models/dishModel');

beforeAll(async () => await dbHelper.connect());
afterEach(async () => await dbHelper.clearDatabase());
afterAll(async () => await dbHelper.closeDatabase());

describe('Integration Test: Dish API', () => {
  it('POST /api/v1/dishes - should save a dish to the database', async () => {
    const newDish = {
      name: 'Integration Burger',
      price: 250,
      category: 'Main'
    };
    const response = await request(app)
      .post('/api/v1/dishes')
      .send(newDish);
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe('Integration Burger');
    const savedDish = await Dish.findOne({ name: 'Integration Burger' });
    expect(savedDish).toBeTruthy();
    expect(savedDish.price).toBe(250);
  });

  it('GET /api/v1/dishes - should return empty array if DB is empty', async () => {
    const response = await request(app).get('/api/v1/dishes');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0);
  });
});
