"use strict";

const express = require("express");
const { query } = require("../db.js");
const pool = require("../db.js");
const router = express.Router();

router.post("/", async (request, response) => {
  const connection = await pool.getConnection();
  try {
    const ownerQuery =
      "INSERT INTO Owner (ownerPhoneNumber, ownerName) VALUES (?, ?) ON DUPLICATE KEY UPDATE ownerPhoneNumber=ownerPhoneNumber, ownerName=ownerName;";
    const listingOwnsHasQuery =
      "INSERT INTO ListingOwnsHas (listingAddress, ownerPhoneNumber, agentEmail, price) VALUES (?, ?, ?, ?);";
    const PropertyHasQuery =
      "INSERT INTO PropertyHas(listingAddress, location, type, numberOfRooms, numberOfBathrooms, interiorSize, landSize) VALUES (?, ?, ?, ?, ?, ?, ?);";
    const {
      ownerPhoneNumber,
      ownerName,
      listingAddress,
      agentEmail,
      price,
      location,
      type,
      numberOfRooms,
      numberOfBathrooms,
      interiorSize,
      landSize,
    } = request.body;

    await connection.query("START TRANSACTION");
    await connection.query(ownerQuery, [ownerPhoneNumber, ownerName]);
    await connection.query(listingOwnsHasQuery, [
      listingAddress,
      ownerPhoneNumber,
      agentEmail,
      price,
    ]);
    await connection.query(PropertyHasQuery, [
      listingAddress,
      location,
      type,
      numberOfRooms,
      numberOfBathrooms,
      interiorSize,
      landSize,
    ]);
    await connection.query("COMMIT");
    connection.release();
    response.status(200).send("listing was added");
  } catch (error) {
    await connection.query("ROLLBACK");
    connection.release();
    response.status(400).send(error.message);
  }
});

// TODO: Selection
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

// TODO: update operation
router.put("/", async (request, response) => {
  const connection = await pool.getConnection();
  try {
    const ownerQuery =
      "UPDATE Owner SET ownerName=?, ownerPhoneNumber=? WHERE ownerPhoneNumber=?";
    const listingOwnsHasQuery =
      "UPDATE ListingOwnsHas SET listingAddress=?, agentEmail=?, price=? WHERE listingAddress=?;";
    const propertyHasQuery =
      "UPDATE PropertyHas SET location=?, type=?, numberOfRooms=?, numberOfBathrooms=?, interiorSize=?, landSize=? WHERE listingAddress=? AND location=?;";
    const {
      prvOwnerPhoneNumber,
      currOwnerPhoneNumber,
      prvListingAddress,
      currListingAddress,
      ownerName,
      agentEmail,
      price,
      prvLocation,
      currLocation,
      type,
      numberOfRooms,
      numberOfBathrooms,
      interiorSize,
      landSize,
    } = request.body;
    await connection.query("START TRANSACTION");
    await connection.query(ownerQuery, [
      ownerName,
      currOwnerPhoneNumber,
      prvOwnerPhoneNumber,
    ]);
    await connection.query(listingOwnsHasQuery, [
      currListingAddress,
      agentEmail,
      price,
      prvListingAddress,
    ]);
    await connection.query(propertyHasQuery, [
      currLocation,
      type,
      numberOfRooms,
      numberOfBathrooms,
      interiorSize,
      landSize,
      currListingAddress,
      prvLocation,
    ]);
    await connection.query("COMMIT");
    connection.release();
    response.status(200).send(`listing information was updated`);
  } catch (error) {
    await connection.query("ROLLBACK");
    connection.release();
    response.status(400).send(error.message);
  }
});

router.delete("/", async (request, response) => {
  try {
    const sqlQuery = "DELETE FROM ListingOwnsHas WHERE listingAddress=?;";
    const { listingAddress } = request.body;
    await pool.query(sqlQuery, [listingAddress]);
    response.status(200).send("The listing was successfully deleted");
  } catch (error) {
    response.status(400).send(error.message);
  }
});

module.exports = router;
