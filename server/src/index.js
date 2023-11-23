const express = require('express');
const cors = require('cors');
const env = require('dotenv');

// Routes:
const listingsAnalyticsRoute = require('./routes/listings-analytics');
const agentRoute = require('./routes/agent');
const agentAnalyticsRoute = require('./routes/agent-analytics');
const listingsRoute = require('./routes/listings');
const s3Route = require('./routes/s3');

env.config();
const app = express();

const PORT = process.env.SERVER_PORT ?? 5012;

// ADD MIDDLEWARE:
app.use(cors());
app.use(express.json());

// ADD ROUTES:
app.use('/listings/analytics', listingsAnalyticsRoute);
app.use('/listings', listingsRoute);
app.use('/user/agents/analytics', agentAnalyticsRoute);
app.use('/user/agents', agentRoute);
app.use('/s3/presigned-urls', s3Route);

app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});
