const jwt = require('jsonwebtoken');
const User = require('../server/model/user'); // Define the User schema and model
const dotenv = require('dotenv');

dotenv.config();

const secretKey = process.env.JWT_KEY; // Replace with a secure secret key

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Create and save the user to the database
    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

const authenticateJWT = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Authorization token missing' });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    const user = await User.findOne({ email: decoded.email }); // Retrieve user from database based on email
    req.user = user; // Set the user on the request object
    next(); // Proceed to the next middleware/route
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

module.exports = { signup, login, authenticateJWT };
