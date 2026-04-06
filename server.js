require('dotenv').config();
const express = require('express');

const connectDB = require('./src/config/db');
const app = express();
if (process.env.NODE_ENV !== 'test') {
    connectDB();
}

const PORT = process.env.PORT || 3000;
const BASE_URI = process.env.BASE_URI || '/api/v1';

app.use(express.json());
const apiRoutes = require('./src/routes/apiRoutes');
const chefRoutes = require('./src/routes/chefRoutes');
const dishRoutes = require('./src/routes/dishRoutes');
const authRoutes = require('./src/routes/authRoutes')

app.use(BASE_URI, apiRoutes);
app.use(BASE_URI + '/chefs', chefRoutes);
app.use(BASE_URI + '/dishes', dishRoutes);
app.use(BASE_URI + '/auth', authRoutes);


// ONLY start the server if NOT running tests
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}${BASE_URI}`);
    });
}

// Export app for Supertest
module.exports = app;
