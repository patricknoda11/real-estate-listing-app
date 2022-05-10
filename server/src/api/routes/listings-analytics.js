const express = require('express');
const pool = require('../db.js');
const router = express.Router();

/**
 * Gets analytics regarding all listings by using aggregation
 * 		Analytics are comprised of:
 * 			- The number of listings
 * 			- The highest priced listing
 * 			- The lowest priced listing
 * 			- The average price of all listings
 */
router.get('/', async (request, response) => {
	try {
		const ANALYTICS_QUERY = 'SELECT COUNT(*) FROM ListingHas;';
		const HIGHEST_PRICE_QUERY = 'SELECT MAX(price) FROM ListingHas;';
		const LOWEST_PRICE_QUERY = 'SELECT MIN(price) FROM ListingHas;';
		const AVG_PRICE_QUERY = 'SELECT AVG(price) FROM ListingHas;';
		const resCount = await pool.query(ANALYTICS_QUERY, ['COUNT(*)']);
		const resMax = await pool.query(HIGHEST_PRICE_QUERY, ['MAX(price)']);
		const resMin = await pool.query(LOWEST_PRICE_QUERY, ['MIN(price)']);
		const resAvg = await pool.query(AVG_PRICE_QUERY, ['AVG(price)']);
		response.status(200).send({
			cnt: resCount[0][0]['COUNT(*)'],
			max: resMax[0][0]['MAX(price)'],
			min: resMin[0][0]['MIN(price)'],
			avg: resAvg[0][0]['AVG(price)'],
		});
	} catch (error) {
		response.status(400).send(error.message);
	}
});

module.exports = router;
