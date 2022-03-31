"use strict";

const express = require("express");
const pool = require("../db.js");
const router = express.Router();

router.post("/", async (request, response) => {
  try {
    const sqlQuery =
      "INSERT INTO Owner (ownerPhoneNumber, ownerName) VALUES (?, ?);";
    const { ownerPhoneNumber, ownerName } = request.body;
    await pool.query(sqlQuery, [ownerPhoneNumber, ownerName]);
    response
      .status(200)
      .send(`New owner with phone number, ${ownerPhoneNumber} was added`);
  } catch (error) {
    console.log("HE");
    response.status(400).send(error.message);
  }
});

router.get("/", async (request, response) => {
  try {
    const sqlQuery = "SELECT * FROM Owner WHERE ownerPhoneNumber=?;";
    const { ownerPhoneNumber } = request.body;
    const ownerInfo = await pool.query(sqlQuery, [ownerPhoneNumber]);
    response.status(200).send(ownerInfo);
  } catch (error) {
    response.status(400).send(error.message);
  }
});

router.put("/", async (request, response) => {
  try {
    const sqlQuery =
      "Update Owner SET ownerPhoneNumber=?, ownerName=? Where ownerPhoneNumber=?;";
    const { newOwnerPhoneNumber, newOwnerName, oldOwnerPhoneNumber } =
      request.body;
    await pool.query(sqlQuery, [
      newOwnerPhoneNumber,
      newOwnerName,
      oldOwnerPhoneNumber,
    ]);
    response.status(200).send(`Owner information was updated`);
  } catch (error) {
    response.status(400).send(error.message);
  }
});

router.delete("/", async (request, response) => {
  try {
    const sqlQuery = "DELETE FROM Owner WHERE ownerPhoneNumber=?;";
    const { ownerPhoneNumber } = request.body;
    await pool.query(sqlQuery, [ownerPhoneNumber]);
    response
      .status(200)
      .send(
        `Owner with phoneNumber, ${ownerPhoneNumber}, was successfully deleted`
      );
  } catch (error) {
    response.status(400).send(error.message);
  }
});

module.exports = router;
