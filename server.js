const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

const connectDB = require('./server/database/connection');

const app = express();

dotenv.config();
const PORT = process.env.PORT || 8080;

// mongoDB connection
connectDB();

app.use(cors());
app.use(bodyParser.json());

// Load routes
app.use('/', require('./server/routes/router'));

app.listen(PORT, () => { console.log(`Server running on http://localhost:${PORT}`) });