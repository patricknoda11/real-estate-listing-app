"use strict";

const express = require("express");
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

// TODO: Join query
router.get("/", async (request, response) => {
  try {
    const { listingAddress } = request.body;
    console.log(listingAddress);
    // retrieves all of the information associated with a specific listing
    const sqlQuery =
      "SELECT * FROM ListingOwnsHas, PropertyHas, Owner, Agent WHERE ListingOwnsHas.agentEmail=Agent.agentEmail AND ListingOwnsHas.ownerPhoneNumber=Owner.ownerPhoneNumber AND PropertyHas.listingAddress=ListingOwnsHas.listingAddress AND ListingOwnsHas.listingAddress=?";
    const queryResponse = await pool.query(sqlQuery, [listingAddress]);
    response.status(200).send(queryResponse[0]);
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
