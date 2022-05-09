const express = require('express');
const pool = require('../db.js');
const router = express.Router();

/** Agent analytics:
 * // find the name of agents and his/her highest priced listing, if he has >= a certain number of listings
 */
router.post('/', async (request, response) => {
	try {
		const AGENT_ANALYTICS_QUERY =
			'SELECT name, phoneNumber, agentEmail, Max(price), Min(price), Avg(price) FROM Agent, ListingHas WHERE Agent.agentEmail=ListingHas.agentEmail GROUP BY Agent.agentEmail HAVING ? <= (SELECT COUNT(*) FROM ListingHas LOH2 WHERE Agent.agentEmail=LOH2.agentEmail);';
		const { count } = request.body;
		const queryResponse = await pool.query(sqlQuery, [count]);
		response.status(200).send(queryResponse[0]);
	} catch (error) {
		response.status(400).send(error.message);
	}
});

module.exports = router;
