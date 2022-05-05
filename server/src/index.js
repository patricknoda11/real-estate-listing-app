const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authorizationMiddleware = require('./api/middleware/authorization');
const listingsRoute = require('./api/routes/public/listings');
const agentAuthenticationRoute = require('./api/routes/public/agent-authentication');
const buyerAuthenticationRoute = require('./api/routes/public/buyer-authentication');
const agentListingsRoute = require('./api/routes/private/agent-listings');
const agentAppointmentsRoute = require('./api/routes/private/agent-appointments');
const buyerAppointmentsRoute = require('./api/routes/private/buyer-appointments');

const PORT = process.env.SERVER_PORT || 5012;
const app = express();

// MIDDLEWARE //
app.use(cors());
app.use(express.json());

// ROUTES //
// Public routes:
app.use('/listings', listingsRoute);
app.use('/agent', agentAuthenticationRoute);
app.use('/buyer', buyerAuthenticationRoute);

// Private routes:
app.use('/agent/listings', authorizationMiddleware, agentListingsRoute);
app.use('/agent/appointments', authorizationMiddleware, agentAppointmentsRoute);
app.use('/buyer/appointments', authorizationMiddleware, buyerAppointmentsRoute);

// Listen:
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
