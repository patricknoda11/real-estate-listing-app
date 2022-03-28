"use strict";

const express = require("express");
const pool = require("../db.js");
const router = express.Router();

// TODO: aggregate requirement
router.get("/", async (_request, response) => {
  try {
    const sqlQuery =
      "SELECT COUNT(*) FROM ListingOwnsHas, PropertyHas WHERE ListingOwnsHas.listingAddress=PropertyHas.listingAddress;";
    const queryResponse = await pool.query(sqlQuery);
    response.status(200).send(queryResponse[0]);
  } catch (error) {
    response.status(400).send(error.message);
  }
});

module.exports = router;
