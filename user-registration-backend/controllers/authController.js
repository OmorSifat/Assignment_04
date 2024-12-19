const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const registerUser = async (req, res) => {
  const { firstName, lastName, NIDNumber, phoneNumber, password, bloodGroup } = req.body;

  const userExists = await User.findOne({ NIDNumber });
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const user = await User.create({ firstName, lastName, NIDNumber, phoneNumber, password, bloodGroup });
  if (user) {
    res.status(201).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      token: generateToken(user.id),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

const loginUser = async (req, res) => {
  const { phoneNumber, password } = req.body;

  const user = await User.findOne({ phoneNumber });
  if (user && (await user.matchPassword(password))) {
    res.cookie('token', generateToken(user.id), { httpOnly: true });
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

module.exports = { registerUser, loginUser };
