const express = require("../node_modules/express");
const cors = require("../node_modules/cors");
const env = require("../node_modules/dotenv");
const queryPool = require("./db.js");
const app = express();
env.config();

// add middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.SERVER_PORT || 5013;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
