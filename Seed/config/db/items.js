let ddpClient = require('./lib/ddpClient');

let ItemsDB = {};

ItemsDB.subscribeToLists = () => {
  return ddpClient.subscribe('items', [])
};

ItemsDB.observeLists = (cb) => {
  let observer = ddpClient.connection.collections.observe(() => {
    let collection = ddpClient.connection.collections.bills;
    if (collection)
      return collection.find();
  });

  observer.subscribe((results) => {
    cb(results);
  });
};

module.exports = ItemsDB;
