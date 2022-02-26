const { proofJwt } = require("../helpers");
const { ChatMessages } = require("../models");
const chatMessages = new ChatMessages();
module.exports = async (socket, io) => {
    const user = await proofJwt(socket.handshake.headers["x-token"]);
    if (!user) {
        return socket.disconnect();
    }
    chatMessages.connectUser(user);
    socket.join(user.id);
    socket.on("disconnect", () => {
        chatMessages.disconnectUser(user.id);
        socket.broadcast.emit("active-users", chatMessages.usersArr);
        return socket.disconnect();
    });
    socket.on("logout", () => {
        return socket.disconnect();
    });
    socket.on("send-message", ({ message, uid }) => {
        console.log("uid", uid);
        if (uid && chatMessages.idArr.includes(uid)) {
            socket.to(uid).emit("private-message", {
                id: user.id,
                name: user.name,
                message,
            });
        } else {
            chatMessages.sendMessage(user.id, user.name, message);
            io.emit("receive-messages", chatMessages.last10);
            console.log(message);
        }
    });
    io.emit("active-users", chatMessages.usersArr);
    console.log("Conectado", user.name);
};
