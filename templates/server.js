const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");

const app = express();
const config = require("./webpack.config.js");
const compiler = webpack(config);


function loadManifest() {
  return require('./dist/manifest.json');
}

// Configure view engine and directory
app.set('view engine', 'ejs');
app.set('views', './templates');

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    writeToDisk: true
  })
);


// Load manifest.json to get hash resource urls
app.use(function manifestMiddleware(req, res, next) {
  const manifest = loadManifest();
  res.locals = {
    manifest: manifest,
  };
  next();
});


// *****************************************
// ** Configure route here
// *****************************************
app.get('/', function (req, res) {
  res.render('pages/home');
});

app.get('/:page', function (req, res) {
  res.render('pages/' + req.params.page);
});


// Serve the files on port 3000.
app.listen(3000, function() {
  console.log("Example app listening on port 3000!\n");
});
