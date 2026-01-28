require('dotenv').config();

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const BASE_URI = process.env.BASE_URI || '/api/v1';

app.use(express.json());

const apiRoutes = require('./src/routes/apiRoutes');
app.use(BASE_URI, apiRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}${BASE_URI}`);
});
