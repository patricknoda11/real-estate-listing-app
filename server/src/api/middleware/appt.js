"use strict";

const express = require("express");
const pool = require("../db.js");
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const { apptDate, timeOfDay, description } = request.body;
    const appointmentAcctInfo = await pool.query(
      "SELECT * FROM AppointmentRequestsResponds WHERE apptDate=? AND timeOfDay=? AND description",
      [apptDate, timeOfDay, description]
    );
    response.status(200).send(appointmentAcctInfo);
  } catch (error) {
    response.status(400).send(error.message);
  }
});

router.post("/", async (request, response) => {
  try {
    const {
      apptDate,
      appointmentAcctId,
      description,
      apptType,
      buyerAcctId,
      timeOfDay,
    } = request.body;
    const newAppointment = await pool.query(
      "INSERT INTO AppointmentRequestsResponds (apptDate, agentAcctId, description, apptType, apptType, buyerAcctId, timeOfDay) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [apptDate, agentAcctId, description, apptType, buyerAcctId, timeOfDay]
    );
    response.status(200).send(newAppointment);
  } catch (error) {
    response.status(400).send(error.message);
  }
});

router.put("/", async (request, response) => {
  try {
    const {
      apptDate,
      appointmentAcctId,
      description,
      apptType,
      buyerAcctId,
      timeOfDay,
    } = request.body;
    await pool.query(
      "Update AppointmentRequestsResponds SET description=?, apptType=?, WHERE apptDate=?, agentAcctId=?, buyerAcctId=?, timeOfDay=?",
      [
        apptDate,
        appointmentAcctId,
        description,
        apptType,
        buyerAcctId,
        timeOfDay,
      ]
    );
    response.status(200).send(`Appointment information was updated`);
  } catch (error) {
    response.status(400).send(error.message);
  }
});

router.delete("/", async (request, response) => {
  try {
    const { apptDate, description, apptType, timeOfDay } = request.body;
    await pool.query(
      "DELETE FROM AppointmentRequestsResponds WHERE apptDate=? AND description=? AND apptType=? AND timeOfDay=?",
      [apptDate, description, apptType, timeOfDay]
    );
    response.status(200).send("The appointment was successfully deleted");
  } catch (error) {
    response.status(400).send(error.message);
  }
});

module.exports = router;
