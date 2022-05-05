const express = require("express");
const cors = require("cors");
require("dotenv").config();
const homeRoute = require("./api/routes/home");
const listingsRoute = require("./api/routes/listings");
const agentLoginRoute = require("./api/routes/public/agent-authentication");
const agentRegisterationRoute = require("./api/routes/public/agent-registeration");

const PORT = process.env.SERVER_PORT || 5012;
const app = express();

// MIDDLEWARE //
app.use(cors());
app.use(express.json());

// ROUTES //
// public routes:
app.use("/", homeRoute);
app.use("/listings", listingsRoute);
app.use("/agent", agentLoginRoute);
// private routes:
app.use("/");
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
