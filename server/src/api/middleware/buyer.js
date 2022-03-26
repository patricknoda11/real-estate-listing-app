"use strict";

const express = require("express");
const pool = require("../db.js");
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const { email, password } = request.body;
    const buyerAcctInfo = await pool.query(
      "SELECT * FROM Buyer WHERE email=? AND password=?",
      [email, password]
    );
    response.json(buyerAcctInfo);
  } catch (error) {
    response.status(400).send(error.message);
  }
});

router.post("/", async (request, response) => {
  try {
    const {
      phoneNumber,
      email,
      password,
      name,
      birthday,
      typePreference,
      budget,
    } = request.body;
    await pool.query(
      "INSERT INTO Buyer (phoneNumber, email, password, name, birthday, typePreference, budget) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [phoneNumber, email, password, name, birthday, typePreference, budget]
    );
    response.json(`New buyer, ${name} was added`);
  } catch (error) {
    response.status(400).send(error.message);
  }
});

router.put("/", async (request, response) => {
  try {
    const {
      accId,
      phoneNumber,
      email,
      password,
      name,
      birthday,
      typePreference,
      budget,
    } = request.body;
    await pool.query(
      "Update Buyer SET phoneNumber=?, email=?, password=?, name=?, birthday=?, typePreference=?, budget=? Where accId=?",
      [
        phoneNumber,
        email,
        password,
        name,
        birthday,
        typePreference,
        budget,
        accId,
      ]
    );
    response.json(`Buyer information for ${name} was updated`);
  } catch (error) {
    response.status(400).send(error.message);
  }
});

router.delete("/", async (request, response) => {
  try {
    const { email, password } = request.body;
    const deletedBuyer = await pool.query(
      "DELETE FROM Buyer WHERE email=? AND password=?",
      [email, password]
    );
    response.json("The buyer was successfully deleted");
  } catch (error) {
    response.status(400).send(error.message);
  }
});

module.exports = router;
