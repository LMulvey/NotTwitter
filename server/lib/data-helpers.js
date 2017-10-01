"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
        db.collection('tweets').insertOne(newTweet, (err, res) => {
          if(err) callback(err);
          callback(null, res);
        });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        db.collection('tweets').find().toArray((err, tweets) => {
          if(err) callback(err);
          callback(null, tweets.sort(sortNewestFirst));
        });
    }
  };
}