"use strict";

const express = require("express");
const pool = require("../db.js");
const router = express.Router();

// TODO:Insert operation
router.post("/", async (request, response) => {
  try {
    const sqlQuery =
      "INSERT INTO Agent (phoneNumber, agentEmail, password, name, birthday, yearsExperience, preferredMeetingDuration, preferredInPersonMeetingLocation) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const {
      phoneNumber,
      email,
      password,
      name,
      birthday,
      yearsExperience,
      preferredMeetingDuration,
      preferredInPersonMeetingLocation,
    } = request.body;
    await pool.query(sqlQuery, [
      phoneNumber,
      email,
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
router.get("/", async (request, response) => {
  try {
    const sqlQuery =
      "SELECT name, agentEmail, phoneNumber, preferredMeetingDuration, preferredInPersonMeetingLocation FROM Agent;";
    const { email, password } = request.body;
    const agentAcctInfo = await pool.query(sqlQuery, [email, password]);
    response.status(200).send(agentAcctInfo);
  } catch (error) {
    response.status(400).send(error.message);
  }
});

router.put("/", async (request, response) => {
  try {
    const {
      prvPhoneNumber,
      currPhoneNumber,
      email,
      password,
      name,
      birthday,
      yearsExperience,
      preferredMeetingDuration,
      preferredInPersonMeetingLocation,
    } = request.body;
    await pool.query(
      "Update Agent SET phoneNumber=?, email=?, password=?, name=?, birthday=?, yearsExperience=?, preferredMeetingDuration=?, preferredInPersonMeetingLocation=? Where phoneNumber=?",
      [
        currPhoneNumber,
        email,
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
    const { email, password } = request.body;
    await pool.query("DELETE FROM Agent WHERE email=? AND password=?", [
      email,
      password,
    ]);
    response.status(200).send("The agent was successfully deleted");
  } catch (error) {
    response.status(400).send(error.message);
  }
});

module.exports = router;
