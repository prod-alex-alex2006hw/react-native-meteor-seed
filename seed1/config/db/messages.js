let ddpClient = require('./lib/ddpClient');

let MessagesDB = {};

class Message {
  constructor(message) {
    // Copy properties of Mongo doc
    for (let fld in message) {
      if (message.hasOwnProperty(fld)) {
        this[fld] = message[fld];
      }
    }
  }

  getUser() {
    return ddpClient.connection.collections.users.find({
      _id: this.owner
    });
  }

  getUsername() {
    return this.getUser().username;
  }
}

MessagesDB.subscribe = (skip, limit) => {
  return ddpClient.subscribe('messages', [skip, limit])
};

MessagesDB.observe = (cb) => {
  let observer = ddpClient.connection.collections.observe(() => {
    let messages = ddpClient.connection.collections.messages.find();
    if (messages) {
      return messages.map((m) => new Message(m))
    }
  });

  observer.subscribe((results) => {
    cb(results);
  });
};

MessagesDB.insert = (message) => {
  return ddpClient.call('Messages.insert', [message])
};

MessagesDB.messageCount = () => {
  return ddpClient.call('Messages.count');
}

module.exports = MessagesDB;
