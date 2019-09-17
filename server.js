const https = require("https");
const fs = require("fs");
const path = require("path");
const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

const app = express();
const config = require("./webpack.config.js");
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  })
);

// const liveReload = require("easy-livereload");
// app.use(liveReload({ watchDirs: [path.join(__dirname, "dist")] }));
app.use(express.static(__dirname + "/dist"));

// const hotMiddleware = webpackHotMiddleware(compiler);
// app.use(hotMiddleware);

// Serve the files on port 3000.
app.listen(3000, function() {
  console.log("Example app listening on port 3000!\n");
});

// we will pass our 'app' to 'https' server
https
  .createServer(
    {
      key: fs.readFileSync("./ssl/key.pem"),
      cert: fs.readFileSync("./ssl/cert.pem")
    },
    app
  )
  .listen(3001, "0.0.0.0",() => {
    console.log("Example app listening on https port 3001!\n");
  });
