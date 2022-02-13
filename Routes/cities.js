const Router = require("express").Router();

const { cities } = require("../db");

// CREATE
Router.post("/", (req, res) => {
  cities.push(req.body);
  res.send(cities);
});

// READ
Router.get("/", (req, res) => {
  res.send(cities);
});

module.exports = Router;
