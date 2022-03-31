"use strict";

const express = require("express");
const pool = require("../db.js");
const router = express.Router();

// TODO:Insert operation
router.post("/", async (request, response) => {
  try {
    const sqlQuery =
      "INSERT INTO Agent (phoneNumber, agentEmail, password, name, birthday, yearsExperience, preferredMeetingDuration, preferredInPersonMeetingLocation) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
    const {
      phoneNumber,
      agentEmail,
      password,
      name,
      birthday,
      yearsExperience,
      preferredMeetingDuration,
      preferredInPersonMeetingLocation,
    } = request.body;

    const res = await pool.query(sqlQuery, [
      phoneNumber,
      agentEmail,
      password,
      name,
      birthday,
      yearsExperience,
      preferredMeetingDuration,
      preferredInPersonMeetingLocation,
    ]);
    response.status(200).send(`New agent, ${name} was added`);
  } catch (error) {
    response.status(400).send(error.message);
  }
});

// TODO: projection operation
router.get("/", async (_request, response) => {
  try {
    const sqlQuery =
      "SELECT name, agentEmail, phoneNumber, preferredMeetingDuration, preferredInPersonMeetingLocation FROM Agent;";
    const agentAcctInfo = await pool.query(sqlQuery);
    response.status(200).send(agentAcctInfo[0]);
  } catch (error) {
    response.status(400).send(error.message);
  }
});

router.put("/", async (request, response) => {
  try {
    const {
      prvPhoneNumber,
      currPhoneNumber,
      agentEmail,
      password,
      name,
      birthday,
      yearsExperience,
      preferredMeetingDuration,
      preferredInPersonMeetingLocation,
    } = request.body;
    await pool.query(
      "Update Agent SET phoneNumber=?, agentEmail=?, password=?, name=?, birthday=?, yearsExperience=?, preferredMeetingDuration=?, preferredInPersonMeetingLocation=? Where phoneNumber=?",
      [
        currPhoneNumber,
        agentEmail,
        password,
        name,
        birthday,
        yearsExperience,
        preferredMeetingDuration,
        preferredInPersonMeetingLocation,
        prvPhoneNumber,
      ]
    );
    response.status(200).send(`Agent information for ${name} was updated`);
  } catch (error) {
    response.status(400).send(error.message);
  }
});

// TODO: delete operation
router.delete("/", async (request, response) => {
  try {
    const { agentEmail, password } = request.body;
    const res = await pool.query(
      "DELETE FROM Agent WHERE agentEmail=? AND password=?;",
      [agentEmail, password]
    );
    response
      .status(200)
      .send("The agent with the given email has been removed");
  } catch (error) {
    response.status(400).send(error.message);
  }
});

module.exports = router;
