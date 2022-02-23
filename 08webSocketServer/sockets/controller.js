const socketController = (socket) => {
    socket.on("disconnect", () => {
        console.log("Cliente desconectado");
    });
    socket.on("send-message", (payload, callback) => {
        const id = 123456;
        callback(id);
        socket.broadcast.emit("send-message", payload);
    });
};
module.exports = {
    socketController,
};