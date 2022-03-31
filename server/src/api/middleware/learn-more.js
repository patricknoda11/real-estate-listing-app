"use strict";

const express = require("express");
const pool = require("../db.js");
const router = express.Router();

// TODO: Join query
router.get("/:listingAddress", async (request, response) => {
  try {
    const listingAddress = request.params.listingAddress;
    // retrieves all of the information associated with a specific listing
    const sqlQuery =
      "SELECT * FROM ListingOwnsHas, PropertyHas, Owner, Agent WHERE ListingOwnsHas.agentEmail=Agent.agentEmail AND ListingOwnsHas.ownerPhoneNumber=Owner.ownerPhoneNumber AND PropertyHas.listingAddress=ListingOwnsHas.listingAddress AND ListingOwnsHas.listingAddress=?";
    const queryResponse = await pool.query(sqlQuery, [listingAddress]);
    response.status(200).send(queryResponse[0]);
  } catch (error) {
    response.status(400).send(error.message);
  }
});

module.exports = router;
