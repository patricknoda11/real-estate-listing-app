"use strict";

const express = require("express");
const pool = require("../db.js");
const router = express.Router();

// TODO: aggregate requirement
router.get("/", async (_request, response) => {
  try {
    const sqlQueryCount = "SELECT COUNT(*) FROM ListingOwnsHas;";
    const sqlQueryMax = "SELECT MAX(price) FROM ListingOwnsHas;";
    const sqlQueryMin = "SELECT MIN(price) FROM ListingOwnsHas;";
    const sqlQueryAvg = "SELECT AVG(price) FROM ListingOwnsHas;";
    const queryResponseCount = await pool.query(sqlQueryCount);
    const queryResponseMax = await pool.query(sqlQueryMax);
    const queryResponseMin = await pool.query(sqlQueryMin);
    const queryResponseAvg = await pool.query(sqlQueryAvg);
    response.status(200).send({
      cnt: queryResponseCount[0][0]["COUNT(*)"],
      max: queryResponseMax[0][0]["MAX(price)"],
      min: queryResponseMin[0][0]["MIN(price)"],
      avg: queryResponseAvg[0][0]["AVG(price)"],
    });
  } catch (error) {
    response.status(400).send(error.message);
  }
});

module.exports = router;
