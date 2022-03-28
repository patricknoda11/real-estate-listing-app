"use strict";

const express = require("express");
const pool = require("../db.js");
const router = express.Router();

router.get("/", async (_request, response) => {
  try {
    const sqlQuery =
      "SELECT MAX(price), MIN(price), AVG(price), COUNT(listingAddress) FROM ListingOwnsHas, PropertyHas WHERE ListingOwnsHas.listingAddress=PropertyHas.listingAddress;";
    const response = await pool.query(sqlQuery);
    response.status(200).send(response);
  } catch (error) {
    response.status(400).send(error.message);
  }
});

module.exports = router;
