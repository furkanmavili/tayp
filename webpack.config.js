const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    homePage: "./src/index.js",
    statPage: "./src/stats.js",
  },
  devServer: {
    contentBase: "./",
    hot: true,
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  watch: true,
};
