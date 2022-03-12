const express = require("../node_modules/express");
const cors = require("../node_modules/cors");
const env = require("../node_modules/dotenv");
const pool = require("./db.js");
const homeRoute = require("./api-routes/home");

const app = express();
env.config();

// add middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.SERVER_PORT || 5013;

app.get("/", async (request, response) => {
  response.send("howwdy");
});

app.use("/home", homeRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
