const User = require('../models/User');
const jwt = require('jsonwebtoken');

// REGISTER
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: 'User already exists' });
    }

    await User.create({
      email,
      password 
    });

    res.json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ message: 'Register error' });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email incorrect' });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: 'Password incorrect' });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Login error' });
  }
};
