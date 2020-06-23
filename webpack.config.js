const path = require("path");

module.exports = {
  entry: {
    homePage: "./src/index.js",
    statPage: "./src/stats.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  watch: true,
  mode: "production",
};
