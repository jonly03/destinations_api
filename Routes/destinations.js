const Router = require("express").Router();

const uniqid = require("uniqid");

const { destinations } = require("../db");
const { getUnsplashPhoto, checkRequiredFields } = require("../Utils");

Router.get("/", (req, res) => {
  const { id } = req.query;

  if (id !== undefined) {
    return res.send(destinations[id] === undefined ? {} : destinations[id]);
  }
  res.send(destinations);
});

// CREATE DATA
// POST /destinations
Router.post("/", checkRequiredFields, async (req, res) => {
  const { destination, location, description } = req.body;

  // Generate a new unique ID
  const id = uniqid();

  const newDest = {
    id,
    destination,
    location,
    photo: await getUnsplashPhoto(`${destination} ${location}`),
  };
  // check if they sent any of the "non required" fields
  if (description !== undefined) {
    newDest.description = description;
  }

  // save user input in db
  destinations[id] = newDest;

  return res.redirect(`/destinations?id=${id}`, 303);
});

// UPDATE DATA
// PUT /destinations/:id
// body (optional) description, location, destination
Router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { description, location, destination } = req.body;

  if (destinations[id] === undefined) {
    return res.status(404).send({ msg: "Record with that id not found" });
  }

  if (description !== undefined) {
    destinations[id].description = description;
  }

  if (location !== undefined) {
    destinations[id].location = location;
  }

  if (destination !== undefined) {
    destinations[id].destination = destination;
  }

  if (location !== undefined || destination !== undefined) {
    let keyword = "";

    if (location !== undefined) {
      keyword = location;
    }

    if (destination !== undefined) {
      keyword += ` ${destination}`;
    }

    destinations[id].photo = await getUnsplashPhoto(keyword.trim());

    return res.redirect(`/destinations?id=${id}`, 303);
  }

  return res.redirect(`/destinations?id=${id}`, 303);
});

// DELETE DATA
// DELETE /destinations/:id
Router.delete("/:id", (req, res) => {
  delete destinations[req.params.id];

  return res.redirect("/destinations", 303);
});

module.exports = Router;
