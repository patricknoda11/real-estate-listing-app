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
    response.json(agentAcctInfo);
  } catch (error) {
    console.error(error.message);
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
    const newAgent = await pool.query(
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
    response.json(newAgent);
  } catch (error) {
    console.error(error.message);
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
    response.json(`Agent information for ${name} was updated`);
  } catch (error) {
    console.error(error);
  }
});

router.delete("/", async (request, response) => {
  try {
    const { email, password } = request.body;
    await pool.query("DELETE FROM Agent WHERE email=? AND password=?", [
      email,
      password,
    ]);
    response.json("The agent was successfully deleted");
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
