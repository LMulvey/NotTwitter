"use strict";

// Basic express setup:
const PORT          = process.env.PORT || 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const MongoClient   = require("mongodb").MongoClient;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

MongoClient.connect(process.env.MONGODB_URI, function (err, db) {
  if(err) {
    console.log('Error connecting to MongoDB!');
    throw err;
  }
  console.log(`MongoDB connected on ${process.env.MONGODB_URI}`);
  const DataHelpers = require("./lib/data-helpers.js")(db);
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  // Mount the tweets routes at the "/tweets" path prefix:
  app.use("/tweets", tweetsRoutes);
  
});

app.listen(PORT, () => {
  console.log("NotTwitter app listening on port " + PORT);
});