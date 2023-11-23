const express = require('express');
const pool = require('../config/db.js');
const router = express.Router();

/** Agent analytics:
 * // find the name of agents and his/her highest priced listing, if he has >= a certain number of listings
 */
router.post('/', async (request, response) => {
  try {
    const AGENT_ANALYTICS_QUERY =
      'SELECT name, phoneNumber, Agent.agentEmail, MAX(price) as max, MIN(price) as min, AVG(price) as avg, COUNT(*) as cnt FROM Agent, ListingHas WHERE Agent.agentEmail=ListingHas.agentEmail GROUP BY Agent.agentEmail HAVING ? <= (SELECT COUNT(*) FROM ListingHas LOH2 WHERE Agent.agentEmail=LOH2.agentEmail);';
    const { count } = request.body;
    const queryResponse = await pool.query(AGENT_ANALYTICS_QUERY, [count]);
    response.status(200).send(queryResponse[0]);
  } catch (error) {
    console.log(error.message);
    response.status(400).send(error.message);
  }
});

module.exports = router;
