const express = require("../node_modules/express");
const cors = require("../node_modules/cors");
const env = require("../node_modules/dotenv");
const pool = require("./db.js");
const homeRoute = require("./api-routes/admin");
// user/buyer
// user/agent
// admin
// listing
// listing/image
// appt
//

const app = express();
env.config();

// add middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.SERVER_PORT || 5013;

// create
app.post("", async (req, res) => {
  try {
    const { description } = req.body;
    const newStager = await poolquery("write a INSERT statement here");
  } catch (err) {
    console.err(err.message);
  }
});

// app.get("/", async (request, response) => {
//   response.send("howwdy");
// });

app.use("/home", homeRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
