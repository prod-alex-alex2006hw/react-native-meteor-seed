let ddpClient = require('./lib/ddpClient');

let MatchesDB = {};

MatchesDB.subscribe = (skip, limit) => {
  return ddpClient.subscribe('matches', [skip, limit])
};

MatchesDB.observe = (cb) => {
  let observer = ddpClient.connection.collections.observe(() => {
    let collection = ddpClient.connection.collections.matches;
    if (collection)
      return collection.find();
  });

  observer.subscribe((results) => {
    cb(results);
  });
};

MatchesDB.upvote = (key, isYup) => {
  return ddpClient.call('Matches.upvote', [key, isYup])
};

module.exports = MatchesDB;
