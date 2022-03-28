"use strict";

const express = require("express");
const cors = require("cors");
const env = require("dotenv");
const homeRoute = require("./api/middleware/home");
const agentRoute = require("./api/middleware/agent");
const agentAnalyticsRoute = require("./api/middleware/agent-analytics");
const buyerRoute = require("./api/middleware/buyer");
const appointmentRoute = require("./api/middleware/appt");
const listingsRoute = require("./api/middleware/listings");
const listingRoute = require("./api/middleware/listing");
const listingsAnalyticsRoute = require("./api/middleware/listings-analytics");
const ownerRoute = require("./api/middleware/owner");
const app = express();
env.config();

const PORT = process.env.SERVER_PORT || 5012;

// add middleware/routes
app.use(cors());
app.use(express.json());
// app.use("/", homeRoute);
// app.use("/user/buyer", buyerRoute);
// app.use("/appt", appointmentRoute);
app.use("/user/owner", ownerRoute);
app.use("/user/agent", agentRoute);
app.use("/user/agent/analytics", agentAnalyticsRoute);
app.use("/listings", listingsRoute);
app.use("/listings/listing", listingRoute);
app.use("/listings/analytics", listingsAnalyticsRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
