const jwt = require('jsonwebtoken');
const { BadRequestError } = require('../errors/index.js');

const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !username.trim()) {
    throw new BadRequestError('Username is not valid');
  }

  if (!password || !password.trim()) {
    throw new BadRequestError('Password is not valid');
  }

  // hardcoded id without MONGODB
  const id = '_id1223545345';
  const token = jwt.sign({ username, id }, process.env.JWT_SECRET, { expiresIn: '30d' });
  res.status(200).json({ msg: 'User created', token });
}

const dashboard = (req, res) => {
  const randomNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello ${req.user.username}!`,
    secret: `This is your secret number ${randomNumber}`
  });
}

module.exports = { login, dashboard }