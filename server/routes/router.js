const express = require('express');
const router = express.Router();
const controller = require('../controller/scraper'); // to fetch data from backend
const jwt = require('jsonwebtoken');
const { signup, login, authenticateJWT } = require('../../config/auth');

// API Endpoints
router.post('/signup', signup);
router.post('/login', login);

// Routes with JWT authentication
router.get('/getFlipkartData', authenticateJWT, controller.getFlipkartData);
router.post('/postFlipkartUrl', authenticateJWT, controller.saveFlipkartUrl);

module.exports = router;