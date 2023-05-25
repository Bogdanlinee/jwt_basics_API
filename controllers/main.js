const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error.js');

const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !username.trim()) {
    throw new CustomAPIError('Username is not valid', 400);
  }

  if (!password || !password.trim()) {
    throw new CustomAPIError('Password is not valid', 400);
  }

  // demo id without MONGO
  const id = '_id1223545345';
  const token = jwt.sign({ username, id }, process.env.JWT_SECRET, { expiresIn: '30d' });
  res.status(200).json({ msg: 'User created', token });
}

const dashboard = (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomAPIError('Auth token is wrong', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const randomNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `Hello ${decoded.username}!`,
      secret: `This is your secret number ${randomNumber}`
    });
  } catch (err) {
    console.log(err);
    throw new CustomAPIError('Not authorized to access this route', 401);
  }

}

module.exports = { login, dashboard }