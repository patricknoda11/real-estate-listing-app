"use strict";

const express = require("express");
const pool = require("../db.js");
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    let {
      numBathrooms,
      interiorSize,
      landSize,
      startingPrice,
      maximumPrice,
      orderBy,
    } = request.body;

    // ensure that orderBy is either asc or desc (defaults to desc)
    orderBy = orderBy.toLowerCase() === "asc" ? "asc" : "desc";

    const listings = await pool.query(
      "SELECT price, numberOfBathrooms, interiorSize, landSize, location FROM listingOwnsHas, PropertyHas WHERE listingOwnsHas.listingId = PropertyHas.listingId AND numberOfBathrooms >= ? AND interiorSize >= ? AND landSize >= ? AND price BETWEEN ? And ? ORDER BY price ?",
      [
        numBathrooms,
        interiorSize,
        landSize,
        startingPrice,
        maximumPrice,
        orderBy,
      ]
    );
    response.status(200).send(listings);
  } catch (error) {
    response.status(400).send(error.message);
  }
});

router.post("/", async (request, response) => {
  try {
    const { ownerPhoneNumber, accId, price } = request.body;
    const newListing = await pool.query(
      "INSERT INTO listing (ownerPhoneNumber, accId, price) VALUES (?, ?, ?)",
      [ownerPhoneNumber, accId, price]
    );
    response.status(200).send(newListing);
  } catch (error) {
    response.status(400).send(error.message);
  }
});

router.put("/", async (request, response) => {
  try {
    const { listingId, ownerPhoneNumber, accId, price } = request.body;
    await pool.query(
      "Update listing SET ownerPhoneNumber=?, accId=?, price=? Where listingId=?",
      [ownerPhoneNumber, accId, price, listingId]
    );
    response.status(200).send(`listing information was updated`);
  } catch (error) {
    response.status(400).send(error.message);
  }
});

router.delete("/", async (request, response) => {
  try {
    const { ownerPhoneNumber } = request.body;
    await pool.query("DELETE FROM listing WHERE ownerPhoneNumber=?", [
      ownerPhoneNumber,
    ]);
    response.status(200).send("The listing was successfully deleted");
  } catch (error) {
    response.status(400).send(error.message);
  }
});

module.exports = router;
