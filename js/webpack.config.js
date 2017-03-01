"use strict";
module.exports = {
  entry: "./main",
  output: {
    filename: "script.js",
    library: "home"
  },
  watch: true,
  watchOptions:  {
    aggregateTimeout = 200
  }
}
