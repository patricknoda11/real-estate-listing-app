"use strict";

const express = require("express");
const pool = require("../db.js");
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const { email, password } = request.body;
    const agentAcctInfo = await pool.query(
      "SELECT * FROM Agent WHERE email=? AND password=?",
      [email, password]
    );
    response.status(200).send(agentAcctInfo);
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
      yearsExperience,
      preferredMeetingDuration,
      preferredInPersonMeetingLocation,
    } = request.body;
    await pool.query(
      "INSERT INTO Agent (phoneNumber, email, password, name, birthday, yearsExperience, preferredMeetingDuration, preferredInPersonMeetingLocation) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        phoneNumber,
        email,
        password,
        name,
        birthday,
        yearsExperience,
        preferredMeetingDuration,
        preferredInPersonMeetingLocation,
      ]
    );
    response.status(200).send(`New agent, ${name} was added`);
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
      yearsExperience,
      preferredMeetingDuration,
      preferredInPersonMeetingLocation,
    } = request.body;
    await pool.query(
      "Update Agent SET phoneNumber=?, email=?, password=?, name=?, birthday=?, yearsExperience=?, preferredMeetingDuration=?, preferredInPersonMeetingLocation=? Where accId=?",
      [
        phoneNumber,
        email,
        password,
        name,
        birthday,
        yearsExperience,
        preferredMeetingDuration,
        preferredInPersonMeetingLocation,
        accId,
      ]
    );
    response.status(200).send(`Agent information for ${name} was updated`);
  } catch (error) {
    response.status(400).send(error.message);
  }
});

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
