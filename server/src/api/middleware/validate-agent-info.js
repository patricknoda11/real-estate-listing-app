const isValidEmail = require("../utils/email-validator");

/**
 * Middleware that checks whether agent registeration info is correctly formated
 * @param  req - user request
 * @param  res - user response
 * @param  next - calls the next middleware/route
 */
const validateAgentRegisterationInfo = (req, res, next) => {
  const REJECTION_MESSAGE = `Invalid agent registeration info`;
  const REJECTION_STATUS_CODE = 401;
  const { email, password, phoneNumber, name } = req.body;

  if (!email || !password || !phoneNumber || !name) {
    res.status(REJECTION_STATUS_CODE).json({ error: REJECTION_MESSAGE });
  }

  if (!isValidEmail(email)) {
    res.status(REJECTION_STATUS_CODE).json({ error: REJECTION_MESSAGE });
  }

  next();
};

/**
 * Middleware that checks whether agent login info is correctly formated
 * @param  req - user request
 * @param  res - user response
 * @param  next - calls the next middleware/route
 */
const validateAgentLoginInfo = (req, res, next) => {
  const REJECTION_MESSAGE = `Invalid agent login info`;
  const REJECTION_STATUS_CODE = 401;
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(REJECTION_STATUS_CODE).json({ error: REJECTION_MESSAGE });
  }

  if (!isValidEmail(email)) {
    res.status(REJECTION_STATUS_CODE).json({ error: REJECTION_MESSAGE });
  }

  next();
};

module.exports = { validateAgentRegisterationInfo, validateAgentLoginInfo };
