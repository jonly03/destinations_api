const db = require("./db");
const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

// Create an express server (deaf)
const server = express();

server.use(cors());

// Make the server listen
server.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});

// Endpoints (Routes) are made up of the method and the path
// GET /
server.get("/", (req, res) => {
  res.send(db);
});
