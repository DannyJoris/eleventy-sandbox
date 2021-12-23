const Cache = require("@11ty/eleventy-cache-assets");

module.exports = async function() {
  return await Cache('https://ghibliapi.herokuapp.com/vehicles?limit=100', {
    duration: "30m",
    type: "json",
  });
};
