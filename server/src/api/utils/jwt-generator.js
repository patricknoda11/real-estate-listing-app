const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtGenerator = (userId) => {
  const EXPIRATION_TIME = 3600; // 30 minutes
  const payload = {
    user: userId,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: EXPIRATION_TIME,
  });
};

module.exports = jwtGenerator;
