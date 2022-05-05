const express = require('express');
const pool = require('../../utils/db');
const url = require('url');
const router = express.Router();

/**
 * Gets all listings that meet selection criteria
 */
router.get('/', async (req, res) => {
  const SELECTION_QUERY = `SELECT agentEmail, price, propertyAddress,
     propertyLocation, propertyType, propertyNumBedrooms, propertyNumBathrooms,
      propertyInteriorSize, propertyLandSize FROM ListingHas, PropertyHas WHERE
      ListingHas.listingId=PropertyHas.listingId AND propertyNumBathrooms >= ?
       AND propertyNumBedrooms >= ? AND propertyInteriorSize >= ? AND 
       propertyLandSize >= ? AND price BETWEEN ? AND ?`;
  const { minBath, minBed, minIntSize, minLandSize, startPrice, maxPrice } =
    url.parse(req.url, true).query;

  try {
    const listings = await pool.query(SELECTION_QUERY, [
      minBath,
      minBed,
      minIntSize,
      minLandSize,
      startPrice,
      maxPrice,
    ]);
    res.status(200).json({ listings: listings });
  } catch (error) {
    res.status(400).json({ error: error.msg });
  }
});

/**
 * Gets all listings that meet selection criteria
 */
router.get('/:listingId', async (req, res) => {
  const LISTING_QUERY = `SELECT agentPhoneNumber, agentEmail, agentName,
  price, propertyAddress, propertyLocation, propertyType, propertyNumBedrooms,
  propertyNumBathrooms, propertyInteriorSize, propertyLandSize FROM ListingHas,
   PropertyHas, Agent WHERE ListingHas.listingId=PropertyHas.listingId AND
   ListingHas.agentId=Agent.agentId AND ListingHas.listingId=?`;
  const { listingId } = req.params;

  try {
    const listing = await pool.query(LISTING_QUERY, [listingId]);
    res.status(200).json({ listing: listing });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
