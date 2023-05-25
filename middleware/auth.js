const jwt = require('jsonwebtoken');
const { UnAuthorizedError } = require('../errors/index.js');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnAuthorizedError('You are not authorized to get this resource');
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    throw new UnAuthorizedError('You are not authorized to get this resource');
  }
}

module.exports = authMiddleware;