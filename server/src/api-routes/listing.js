const express = require("express");
const pool = require("../db.js");
const router = express.Router();

router.get("/", (request, response) => {
  response.send("listing");
});

module.exports = router;
