const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Middleware that checks whether user is authorized through jwt token verification process
 * @param  req - user request
 * @param  res - user response
 * @param  next - calls the next middleware/route
 */
const authorization = (req, res, next) => {
  try {
    const UNAUTHORIZED_MESSAGE = `user is unauthorized`;
    const jwtToken = req.header("jwt_token");

    if (!jwtToken) {
      res.status(403).send(UNAUTHORIZED_MESSAGE);
    }

    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

    res.user = payload.user;
    next();
  } catch (error) {
    res.status(403).send(UNAUTHORIZED_MESSAGE);
  }
};

module.exports = authorization;
