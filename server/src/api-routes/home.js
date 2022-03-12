const router = require("express").Router();
const pool = require("../db.js");

router.get("/", (request, response) => {
  response.send("home");
});

module.exports = router;
