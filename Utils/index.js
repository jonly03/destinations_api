const fetch = require("node-fetch");

async function getUnsplashPhoto(keyword) {
  const url = `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_API_KEY}&query=${keyword}
    `;

  // go get data from the url
  const res = await fetch(url);
  const data = await res.json();

  return data.urls.small;
}

function checkRequiredFields(req, res, next) {
  const { destination, location } = req.body;
  // make sure that they sent the required fields
  if (destination === undefined || location === undefined) {
    // if not send them a status back with a message
    return res
      .status(400)
      .send({ error: "destination and location are required" });
  }

  next();
}

module.exports = {
  getUnsplashPhoto,
  checkRequiredFields,
};
