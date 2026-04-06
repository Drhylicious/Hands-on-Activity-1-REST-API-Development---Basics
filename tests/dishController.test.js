const { getAllDishes, createDish } = require('../src/controllers/dishController');
const Dish = require('../src/models/dishModel');
const httpMocks = require('node-mocks-http');

jest.mock('../src/models/dishModel');

describe('Dish Controller Unit Tests', () => {
  let req, res;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
  });

  describe('GET /dishes (getAllDishes)', () => {
    it('should return 200 OK and a list of dishes', async () => {
      const fakeData = [
        { name: 'Adobo', price: 150 },
        { name: 'Sinigang', price: 200 }
      ];
      Dish.find.mockResolvedValue(fakeData);
      await getAllDishes(req, res);
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toStrictEqual(fakeData);
      expect(Dish.find).toHaveBeenCalledTimes(1);
    });

    it('should return 500 Internal Server Error if database crashes', async () => {
      Dish.find.mockRejectedValue(new Error('DB Connection Lost'));
      await getAllDishes(req, res);
      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toStrictEqual({ message: 'DB Connection Lost' });
    });
  });

  describe('POST /dishes (createDish)', () => {
    it('should return 201 Created and the new dish', async () => {
      req.body = { name: 'Pancit', price: 100 };
      const fakeSavedDish = { _id: '12345', name: 'Pancit', price: 100 };
      Dish.create.mockResolvedValue(fakeSavedDish);
      await createDish(req, res);
      expect(res.statusCode).toBe(201);
      expect(res._getJSONData()).toStrictEqual(fakeSavedDish);
      expect(Dish.create).toHaveBeenCalledWith(req.body);
    });
  });
});