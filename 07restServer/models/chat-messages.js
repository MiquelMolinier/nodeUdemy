class Message {
    constructor(uid, name, message) {
        this.uid = uid;
        this.name = name;
        this.message = message;
    }
}
class ChatMessages {
    constructor() {
        this.messages = [];
        this.users = {};
    }
    get last10() {
        if (this.messages.length > 10) this.messages.shift();
        return this.messages;
    }
    get usersArr() {
        return Object.values(this.users);
    }
    get idArr() {
        return Object.keys(this.users);
    }
    sendMessage(uid, name, message) {
        this.messages.push(new Message(uid, name, message));
    }
    connectUser(user) {
        this.users[user._id] = user;
    }
    disconnectUser(id) {
        delete this.users[id];
    }
}
module.exports = ChatMessages;
