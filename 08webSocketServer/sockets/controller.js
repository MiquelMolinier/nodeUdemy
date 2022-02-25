const TicketControl = require("../models/ticket-control");
const ticketControl = new TicketControl();
const socketController = (socket) => {
    console.log(socket.id);
    socket.emit("last-ticket", ticketControl.last);
    socket.emit("last-tickets", ticketControl.last4);
    socket.emit("update-list", ticketControl.tickets.length);
    socket.on("next-ticket", (payload, callback) => {
        const next = ticketControl.next();
        callback(next);
        // socket.broadcast.emit("update-list", ticketControl.tickets.length);
        socket.broadcast.emit("update-list", ticketControl.tickets.length);
        // Notificar que hay un nuevo ticket pendiente para asignar
    });
    socket.on("serve-ticket", ({ desk }, callback) => {
        if (!desk) {
            return callback({
                ok: false,
                msg: "El escritorio es obligatorio",
            });
        }
        const ticket = ticketControl.serve(desk);
        socket.broadcast.emit("update-list", ticketControl.tickets.length);
        socket.emit("update-list", ticketControl.tickets.length);
        socket.broadcast.emit("last-tickets", ticketControl.last4);
        // Notificar cambio en los últimos 4
        if (!ticket) {
            return callback({
                ok: false,
                msg: "Ya no hay ticket pendientes",
            });
        } else {
            callback({
                ok: true,
                ticket,
            });
        }
    });
};
module.exports = {
    socketController,
};
