const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Converts a jwt_token to user id
 * @param req - request header from http request
 * @throws error if jwt_token is invalid
 * @returns {string} the id of the user
 */
const tokenToId = (req) => {
  const jwtToken = req.header('jwt_token');
  const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);
  return payload.user.id;
};

module.exports = tokenToId;
