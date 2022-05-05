const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../../utils/db');
require('dotenv').config();
const jwtTokenGenerator = require('../../utils/token-generator');
const validRegisterationInfo = require('../../middleware/validate-registeration-info');
const router = express.Router();

/**
 * /buyer/login route
 */
router.post('/login', validRegisterationInfo, async (req, res) => {
  const UNABLE_TO_LOGIN_CODE = 401;
  const BUYER_DOESNT_EXIST_MESSAGE = `No buyer account is associated with given email`;
  const INVALID_INPUT_MESSAGE = `Password or email is invalid`;
  const FIND_BUYER_QUERY = `SELECT * FROM BUYER WHERE buyerEmail=?`;

  const { email, password } = req.body;

  try {
    // Find buyer with matching email:
    const buyer = await pool.query(FIND_BUYER_QUERY, [email]);

    // If there doesn't exist such buyer, reject login:
    if (buyer.rows.length !== 1) {
      res
        .status(UNABLE_TO_LOGIN_CODE)
        .json({ error: BUYER_DOESNT_EXIST_MESSAGE });
    }

    // Check if input password match encrypted password:
    const passwordsMatch = await bcrypt.compare(
      password,
      buyer.rows[0].buyerPassword
    );

    if (!passwordsMatch) {
      res.status(UNABLE_TO_LOGIN_CODE).json({ error: INVALID_INPUT_MESSAGE });
    }

    // Generate token for agent:
    const buyerToken = jwtTokenGenerator(buyer.rows[0].agentId);

    res.status(200).json({ jwt_token: buyerToken });
  } catch (_error) {
    res
      .status(UNABLE_TO_REGISTER_CODE)
      .json({ error: UNABLE_TO_REGISTER_MESSAGE });
  }
});

/**
 * /buyer/registeration route
 */
router.post('/registeration', validRegisterationInfo, async (req, res) => {
  const BUYER_ALREADY_EXISTS_CODE = 401;
  const UNABLE_TO_REGISTER_CODE = 500;
  const BUYER_ALREADY_EXISTS_MESSAGE = `Buyer with the given email already exists`;
  const UNABLE_TO_REGISTER_MESSAGE = `Unable to register new buyer`;
  const FIND_BUYER_QUERY = `SELECT * FROM Buyer WHERE buyerEmail=?`;
  const CREATE_BUYER_QUERY = `INSERT INTO BUYER (buyerId, buyerPhoneNumber, buyerEmail,
     buyerPassword, buyerName, buyerBirthday) VALUES (UUID_TO_BIN(UUID()), ?, ?, ?, ?, ?) RETURNING buyerId`;

  const { name, email, phoneNumber, password, birthday } = req.body;

  try {
    // Find buyers that have the inputted email:
    const buyer = await pool.query(FIND_BUYER_QUERY, [email]);

    // If there exist such buyer, reject registeration:
    if (buyer.rows.length !== 0) {
      res
        .status(BUYER_ALREADY_EXISTS_CODE)
        .json({ error: BUYER_ALREADY_EXISTS_MESSAGE });
    }

    // Encrypt password:
    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    // Create new buyer:
    const newBuyerId = await pool.query(CREATE_BUYER_QUERY, [
      phoneNumber,
      email,
      encryptedPassword,
      name,
      birthday,
    ]);

    // Generate token for new agent:
    const buyerToken = jwtTokenGenerator(newBuyerId.agentId);

    res.status(200).json({ jwt_token: buyerToken });
  } catch (_error) {
    res
      .status(UNABLE_TO_REGISTER_CODE)
      .json({ error: UNABLE_TO_REGISTER_MESSAGE });
  }
});

module.exports = router;
