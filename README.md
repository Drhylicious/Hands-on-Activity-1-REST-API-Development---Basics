# RESTful API Activity - [Jhon Drhy M. Salangsang]

## Best Practices Implementation

**1. Environment Variables:**
- Why did we put `BASE_URI` in `.env` instead of hardcoding it?
- Answer: Using `.env` for `BASE_URI` makes the application configurable and secure. It allows different environments (development, testing, production) to use different API endpoints without changing the code. It also helps prevent sensitive data from being exposed in the source code.

**2. Resource Modeling:**
- Why did we use plural nouns (e.g., `/dishes`) for our routes?
- Answer: Plural nouns are used in RESTful APIs to represent collections of resources. For example, `/dishes` refers to the collection of all dish objects. This makes the API intuitive and consistent with REST conventions, where `/dishes/1` would refer to a specific dish with ID 1.

**3. Status Codes:**

- When do we use `201 Created` vs `200 OK`?
- Answer: `201 Created` is used when a new resource has been successfully created, typically in response to a POST request. `200 OK` is used when a request is successful but does not result in a new resource being created, such as fetching data with GET or updating with PUT.

- Why is it important to return `404` instead of just an empty array or a generic error?
- Answer: Returning `404 Not Found` clearly communicates that the requested resource does not exist. This prevents confusion with an empty collection (which implies the resource exists but has no items) and provides proper feedback for client applications to handle errors appropriately.

**4. Testing:**
- (Paste a screenshot of a successful GET request here)
![Get Request](image.png)

Why did I choose to Embed the [Review/Tag/Log]?

 - **Embed:** Reviews are typically small, frequently-read records tied to a single parent (`Dish`). Embedding reviews inside the `Dish` document keeps related data together, simplifies reads (no additional queries), and is efficient for use cases where reviews are only accessed in the context of their dish.

Why did I choose to Reference the [Chef/User/Guest]?

 - **Reference:** Chefs are standalone entities that can be associated with many dishes. Referencing `Chef` from a `Dish` by ObjectId avoids duplication, keeps the chef data normalized, and allows updating chef details in one place without touching all related dishes. It also keeps the Dish document compact while enabling populated joins when needed.

## Submission Checklist & Answers

1. Code runs via npm run dev with no errors.
2. Registration and Login endpoints are functional.
3. Middleware correctly blocks unauthorized users.
4. GitHub Repo link submitted.

### README.md Questions & Answers

**1. Authentication vs Authorization:**
- Authentication verifies who the user is (e.g., login with email and password).
- Authorization determines what actions the authenticated user can perform (e.g., only admins can create dishes).

**2. Security (bcrypt):**
- We use bcryptjs to hash passwords so they are not stored as plain text in MongoDB. This protects user credentials even if the database is compromised.

**3. JWT Structure:**
- The protect middleware checks for a JWT in the request header, verifies it, and attaches the user information to the request. If the token is invalid or missing, access is denied.

## Hands-on Activity-5_Automated_Testing

| Test ID | Module          | Function    | Scenario (Description)                | Expected Output                        | Status |
|---------|-----------------|------------|---------------------------------------|----------------------------------------|--------|
| UT-001  | DishController  | getAllDishes| Fetch all dishes successfully         | HTTP 200, Array of Dish Objects        | Pass   |
| UT-002  | DishController  | getAllDishes| Database throws error                 | HTTP 500, Error JSON Message           | Pass   |
| UT-003  | AuthMiddleware  | protect     | Missing Authorization header          | HTTP 401, "Not authorized, no token"   | Pass   |
| UT-004  | AuthMiddleware  | protect     | Valid Bearer token provided           | next() is called                       | Pass   |
| UT-005  | DishController  | createDish  | Create a new dish                     | HTTP 201, New Dish Object              | Pass   |

## Jest Coverage Table (Summary)

$ npm run test:coverage

> salangsang-api-activity@1.0.0 test:coverage
> jest --coverage

 PASS  tests/authMiddleware.test.js
 PASS  tests/dishController.test.js
--------------------|---------|----------|---------|---------|----------------------
File                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
--------------------|---------|----------|---------|---------|----------------------
All files           |   55.38 |     37.5 |      30 |   59.01 |                     
 middleware         |   70.58 |       75 |   33.33 |   70.58 |                     
  authMiddleware.js |   70.58 |       75 |   33.33 |   70.58 | 14,23-29            
 src/controllers    |   42.42 |        0 |      40 |   46.66 |                     
  dishController.js |   42.42 |        0 |      40 |   46.66 | 17,22-27,32-39,44-49
 src/models         |   66.66 |        0 |       0 |   71.42 |                     
  dishModel.js      |     100 |      100 |     100 |     100 |                     
  userModel.js      |   54.54 |        0 |       0 |      60 | 28-31,35            
--------------------|---------|----------|---------|---------|----------------------

Test Suites: 2 passed, 2 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        1.228 s
Ran all test suites.

---

## README.md Essay Questions

### 1. Mocking
**Explain why we mocked Dish.find and jwt.verify. What problem does mocking solve?**

Mocking allows us to isolate the unit of code being tested by replacing dependencies (like database calls or JWT verification) with fake implementations. This ensures our tests are fast, reliable, and not dependent on external systems. For example, mocking `Dish.find` lets us test controller logic without needing a real database, and mocking `jwt.verify` lets us simulate authentication without real tokens.

### 2. Code Coverage
**Explain what % Branch coverage means. If it is 50%, what does it imply?**

% Branch coverage measures how many possible code branches (like if/else paths) are executed by the tests. If branch coverage is 50%, it means only half of the possible decision points in the code have been tested, so some logic paths may be untested and could hide bugs.

### 3. Testing Middleware
**Why did we use jest.fn() for next and check that next was not called?**

We use `jest.fn()` to create a mock function for `next` so we can track if and how it was called. In middleware tests, this helps us verify that the middleware either passes control to the next handler (when authorized) or stops the request (when unauthorized). Checking that `next` was not called confirms the middleware correctly blocked unauthorized access.

---

## Hands-on Activity-6_Integration_Testing

### Integration Test Documentation

$ npm test

> salangsang-api-activity@1.0.0 test
> cross-env NODE_ENV=test jest --detectOpenHandles

 PASS  tests/api.integration.test.js
  ● Console
                                                                                      
    console.log
      [dotenv@17.2.3] injecting env (3) from .env -- tip: 🔑 add access controls to secrets: https://dotenvx.com/ops

      at _log (C:\Users\tampu\OneDrive\Desktop\04-Securing API (2)../../../../../../04-Securing API/node_modules/dotenv/lib/main.js:142:11)

 PASS  tests/authMiddleware.test.js
 PASS  tests/dishController.test.js
                                                                                                     
Test Suites: 3 passed, 3 total                                                                       
Tests:       7 passed, 7 total
Snapshots:   0 total
Time:        1.991 s, estimated 4 s
Ran all test suites.

---

## README.md Essay Questions (Integration Testing)

### 1. Unit vs. Integration
**Explain the difference between Unit Test (Activity 5) and Integration Test. What does Integration Testing check that Unit Testing does not?**

Unit tests check individual functions or modules in isolation, often using mocks for dependencies. Integration tests check how different parts of the application (routes, controllers, models, and database) work together as a whole. Integration Testing ensures that the components interact correctly and data flows as expected, which unit tests alone cannot guarantee.

### 2. In-Memory Databases
**Why did we use mongodb-memory-server instead of connecting to MongoDB Atlas? Give at least two reasons.**

1. It prevents test data from polluting the real database, keeping production data safe.
2. It makes tests faster and more reliable, since the database is local and reset for each test run, and does not depend on internet or Atlas availability.

### 3. Supertest
**What is the role of Supertest? Why didn’t we use Postman?**

Supertest allows us to automate HTTP requests and assertions directly in code, making tests repeatable and part of CI/CD pipelines. Postman is a manual tool for API testing, but cannot be used for automated, repeatable integration tests in code.