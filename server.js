"use strict";

// original packages

var express = require("express");
var mongo = require("mongodb");
var mongoose = require("mongoose");

var cors = require("cors");

// my packages
var bodyParser = require("body-parser");
var dotenv = require("dotenv").config();
var dns = require("dns");

var app = express();

// Basic Configuration
var port = process.env.PORT || 3000;

/** this project needs a db !! **/

// mongoose.connect(process.env.MONGOLAB_URI);

// Don't get this entirely???
mongoose.Promise = global.Promise;

// Connect to MongoDB
mongoose.connect(
  process.env.MONGOLAB_URI,
  { useMongoClient: true },
  function(err, db) {
    if (err) {
      console.log("Could not connect to the database!");
      throw err;
    } else {
      console.log("The database is connected!");
    }
  }
);

// Creating a model

const Schema = mongoose.Schema;
const schemaURL = new Schema({
  url: {
    type: String,
    required: true
  },
  short_url: {
    type: String
  },
  full_paste: {
    type: String
  }
});

const ModelURL = mongoose.model("main", schemaURL);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use(bodyParser.urlencoded({ extended: false }));

// views on landing
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

// test API endpoint...
app.get("/test", (req, res) => {
  console.log(req);
  res.json({ greeting: process.env.TESTTEST, url: "test" });
});

//Shortening URL's or taking the raw URL

app.post("/api/shorturl/new", (req, res, next) => {
  let rawURL = req.body.url;
  console.log(rawURL);
});

// Dedirecting to true URL from shortURL

app.get("/api/shorturl/:short", (req, res) => {});

// listen for requests :)

var listener = app.listen(port, function() {
  console.log(
    "Your app is listening on port " +
      listener.address().port +
      " http://localhost:" +
      listener.address().port
  );
});
