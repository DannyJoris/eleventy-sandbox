const Cache = require("@11ty/eleventy-cache-assets");

module.exports = async function() {
  return await Cache('https://ghibliapi.herokuapp.com/films', {
    duration: "30m",
    type: "json",
  });
};
