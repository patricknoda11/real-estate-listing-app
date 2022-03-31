"use strict";

const express = require("express");
const pool = require("../db.js");
const router = express.Router();

// TODO: NESTED AGGREGATION
router.post("/", async (request, response) => {
  try {
    const { count } = request.body;
    // find the name of agents and his/her highest priced listing, if he has >= a certain number of listings
    const sqlQuery =
      "SELECT Agent.name, Agent.phoneNumber, Agent.agentEmail, Max(price) FROM Agent, ListingOwnsHas WHERE Agent.agentEmail=ListingOwnsHas.agentEmail GROUP BY Agent.agentEmail HAVING ? <= (SELECT COUNT(*) FROM ListingOwnsHas LOH2 WHERE Agent.agentEmail=LOH2.agentEmail);";
    const queryResponse = await pool.query(sqlQuery, [count]);
    response.status(200).send(queryResponse[0]);
  } catch (error) {
    response.status(400).send(error.message);
  }
});

module.exports = router;
