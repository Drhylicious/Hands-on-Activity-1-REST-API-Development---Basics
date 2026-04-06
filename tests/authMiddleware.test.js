const { protect } = require('../middleware/authMiddleware');
const jwt = require('jsonwebtoken');
const User = require('../src/models/userModel');
const httpMocks = require('node-mocks-http');

jest.mock('jsonwebtoken');
jest.mock('../src/models/userModel');

describe('Auth Middleware - protect', () => {
  let req, res, next;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
  });

  it('should call next() if token is valid', async () => {
    req.headers.authorization = 'Bearer valid_fake_token';
    jwt.verify.mockReturnValue({ id: 'user123' });
    User.findById.mockReturnValue({
      select: jest.fn().mockResolvedValue({
        _id: 'user123',
        name: 'John'
      })
    });
    await protect(req, res, next);
    expect(jwt.verify).toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should return 401 if no token is provided', async () => {
    await protect(req, res, next);
    expect(res.statusCode).toBe(401);
    expect(res._getJSONData()).toStrictEqual({
      message: 'Not authorized, no token'
    });
    expect(next).not.toHaveBeenCalled();
  });
});