"use strict";

const express = require("express");
const { query } = require("../db.js");
const pool = require("../db.js");
const router = express.Router();

// TODO: Selection
router.post("/", async (request, response) => {
  try {
    let { numBathrooms, interiorSize, landSize, startingPrice, maximumPrice } =
      request.body;

    const listings = await pool.query(
      "SELECT agentEmail, listingOwnsHas.listingAddress, ownerPhoneNumber, price, numberOfBathrooms, interiorSize, landSize, location FROM listingOwnsHas, PropertyHas WHERE listingOwnsHas.listingAddress = PropertyHas.listingAddress AND numberOfBathrooms >= ? AND interiorSize >= ? AND landSize >= ? AND price BETWEEN ? And ?;",
      [numBathrooms, interiorSize, landSize, startingPrice, maximumPrice]
    );
    response.status(200).send(listings[0]);
  } catch (error) {
    response.status(400).send(error.message);
  }
});

module.exports = router;
