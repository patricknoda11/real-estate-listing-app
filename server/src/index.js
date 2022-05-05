const express = require("express");
const cors = require("cors");
require("dotenv").config();
const homeRoute = require("./api/routes/home");
const agentRoute = require("./api/routes/agent");
const agentAnalyticsRoute = require("./api/routes/agent-analytics");
const learnMoreRoute = require("./api/routes/learn-more");
const buyerRoute = require("./api/routes/buyer");
const appointmentRoute = require("./api/routes/appt");
const listingsRoute = require("./api/routes/listings");
const listingRoute = require("./api/routes/listing");
const listingsAnalyticsRoute = require("./api/routes/listings-analytics");
const ownerRoute = require("./api/routes/owner");

const PORT = process.env.SERVER_PORT || 5012;
const app = express();

// MIDDLEWARE:
app.use(cors());
app.use(express.json());

// ROUTES:
// register and login routes:
// app.use("/auth", require("./api/routes/jwt-auth"));
// general routes:
// app.use("/", homeRoute);
// app.use("/user/buyer", buyerRoute);
// app.use("/appt", appointmentRoute);
// app.use("/user/owner", ownerRoute);
// app.use("/listings/analytics", listingsAnalyticsRoute);
// app.use("/user/agents/analytics", agentAnalyticsRoute);
// app.use("/user/agents", agentRoute);
// app.use("/listings", listingsRoute);
// app.use("/listings", learnMoreRoute);
// app.use("/listing", listingRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
