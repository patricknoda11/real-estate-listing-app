const { response } = require('express');
const express = require('express');
const url = require('url');
const pool = require('../../utils/db');
const tokenToId = require('../../utils/token-converter');
const router = express.Router();

/**
 * Creates a new listing for agent
 * each new listing must insert into two seperate relations (ListingHas & PropertyHas)
 */
router.post('/', async (req, res) => {
  const NEW_LISTING_QUERY = `INSERT INTO ListingHas (agentId, price) VALUES (?, ?) RETURNING listingId`;
  const NEW_PROPERTY_QUERY = `INSERT INTO PropertyHas (listingId, propertyAddress, propertyLocation, propertyType, propertyNumBedrooms, propertyNumBathrooms, propertyInteriorSize, propertyLandSize) VALUES (?, ?, ?, ? ,?, ?, ?, ?)`;
  const {
    price,
    propertyAddress,
    propertyLocation,
    propertyType,
    propertyNumBedrooms,
    propertyNumBathrooms,
    propertyInteriorSize,
    propertyLandSize,
  } = req.body;

  // Open connection to handle multiple consecutive queries
  // if one query produces error the process will be rolled back
  const connection = await pool.getConnection();

  try {
    const agentId = tokenToId(req);

    await connection.query('START TRANSACTION');
    const listingId = await connection.query(NEW_LISTING_QUERY, [
      agentId,
      price,
    ]);
    await connection.query(NEW_PROPERTY_QUERY, [
      listingId.rows[0],
      propertyAddress,
      propertyLocation,
      propertyType,
      propertyNumBedrooms,
      propertyNumBathrooms,
      propertyInteriorSize,
      propertyLandSize,
    ]);
    await connection.query('COMMIT');
    connection.release();
    response.status(200).send('listing was added');
  } catch (error) {
    await connection.query('ROLLBACK');
    connection.release();
    res.status(400).send(error.message);
  }
});

/** Gets all listings for specific agent */
router.get('/', async (req, res) => {
  const AGENT_LISTINGS_QUERY = `SELECT listingId, price, propertyAddress, propertyLocation, propertyType, propertyNumBedrooms, propertyNumBathrooms, propertyInteriorSize, propertyLandSize FROM ListingHas, PropertyHas WHERE ListingHas.listingId=PropertyHas.listingId AND agentId=?`;

  try {
    const agentId = tokenToId(req);
    const listings = await pool.query(AGENT_LISTINGS_QUERY, [agentId]);
    res.status(200).json({ listings: listings });
  } catch (error) {
    res.status(400).json({ error: error.msg });
  }
});

/** Delete Listing */
router.delete('/:listingId', async (req, res) => {
  const DELETE_LISTING_QUERY = `DELETE FROM ListingHas WHERE listingId=? AND agentId=?`;
  const DELETE_PROPERTY_QUERY = `DELETE FROM PropertyHas WHERE listingId=?`;
  const { listingId } = req.body;
  // Open connection to handle multiple consecutive queries
  // if one query produces error the process will be rolled back
  const connection = await pool.getConnection();
  try {
    const agentId = tokenToId(req);
    await connection.query('START TRANSACTION');
    await connection.query(DELETE_LISTING_QUERY, [listingId, agentId]);
    await connection.query(DELETE_PROPERTY_QUERY, [listingId]);
    await connection.query('COMMIT');
    connection.release();
    response.status(200).send('listing was deleted');
  } catch (error) {
    await connection.query('ROLLBACK');
    connection.release();
    res.status(400).json({ error: error.msg });
  }
});

module.exports = router;
