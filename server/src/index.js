"use strict";

const express = require("../node_modules/express");
const cors = require("../node_modules/cors");
const env = require("../node_modules/dotenv");
const pool = require("./db.js");
const homeRoute = require("./api-routes/home");
const agentRoute = require("./api-routes/agent");
const buyerRoute = require("./api-routes/buyer");
const appointmentRoute = require("./api-routes/appt");
const listingRoute = require("./api-routes/listing");
const app = express();
env.config();

const PORT = process.env.SERVER_PORT || 5000;

// add middleware
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
