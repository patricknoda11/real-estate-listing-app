"use strict";

const express = require("express");
const pool = require("../db.js");
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const { ownerPhoneNumber, price } = request.body;
    const listing = await pool.query(
      "SELECT * FROM listing WHERE ownerPhoneNumber=? AND price=?",
      [ownerPhoneNumber, price]
    );
    response.json(listingAcctInfo);
  } catch (error) {
    console.error(error.message);
  }
});

router.post("/", async (request, response) => {
  try {
    const { ownerPhoneNumber, accId, price } = request.body;
    const newListing = await pool.query(
      "INSERT INTO listing (ownerPhoneNumber, accId, price) VALUES (?, ?, ?)",
      [ownerPhoneNumber, accId, price]
    );
    response.json(newListing);
  } catch (error) {
    console.error(error.message);
  }
});

router.put("/", async (request, response) => {
  try {
    const { listingId, ownerPhoneNumber, accId, price } = request.body;
    await pool.query(
      "Update listing SET ownerPhoneNumber=?, accId=?, price=? Where listingId=?",
      [ownerPhoneNumber, accId, price, listingId]
    );
    response.json(`listing information for ${name} was updated`);
  } catch (error) {
    console.error(error);
  }
});

router.delete("/", async (request, response) => {
  try {
    const { ownerPhoneNumber } = request.body;
    await pool.query("DELETE FROM listing WHERE ownerPhoneNumber=?", [
      ownerPhoneNumber,
    ]);
    response.json("The listing was successfully deleted");
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
