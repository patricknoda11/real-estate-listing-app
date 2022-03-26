"use strict";

const express = require("express");
const cors = require("cors");
const env = require("dotenv");
const pool = require("./api/db.js");
const homeRoute = require("./api/middleware/home");
const agentRoute = require("./api/middleware/agent");
const buyerRoute = require("./api/middleware/buyer");
const appointmentRoute = require("./api/middleware/appt");
const listingRoute = require("./api/middleware/listing");
const app = express();
env.config();

const PORT = process.env.SERVER_PORT || 5000;

// add middleware/routes
app.use(cors());
app.use(express.json());
app.use("/", homeRoute);
app.use("/user/agent", agentRoute);
app.use("/user/buyer", buyerRoute);
app.use("/appt", appointmentRoute);
app.use("/listing", listingRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
