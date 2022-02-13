require("dotenv").config();

const express = require("express");
const cors = require("cors");

const destinationsRouter = require("./Routes/destinations");
const citiesRouter = require("./Routes/cities");

const PORT = process.env.PORT || 3000;

// Create an express server (deaf)
const server = express();

server.use(cors());
server.use(express.json());

// Make the server listen
server.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});

server.use("/destinations", destinationsRouter);
server.use("/cities", citiesRouter);
