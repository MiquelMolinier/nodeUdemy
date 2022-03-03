const { io } = require("../server");
const { Usuarios } = require("../classes/usuarios");
const usuarios = new Usuarios();
const { crearMensaje } = require("../utils/utils");
io.on("connection", (client) => {
    client.on("entrarChat", ({ nombre, sala }, callback) => {
        if (!nombre) {
            return callback({
                error: true,
                mensaje: "El nombre es necesario",
            });
        }
        if (!sala) {
            return callback({
                error: true,
                mensaje: "La sala es necesaria",
            });
        }
        client.join(sala);
        usuarios.agregarPersona(client.id, nombre, sala);
        const personas = usuarios.getPersonasPorSala(sala);
        client.broadcast.to(sala).emit("listaPersona", personas);
        client.emit("listaPersona", personas);
        client.broadcast
            .to(sala)
            .emit(
                "crearMensaje",
                crearMensaje("Administrador", `${nombre} se unió el chat`)
            );
        callback(personas);
    });
    console.log("Usuario conectado");
    client.on("crearMensaje", (data, callback) => {
        const persona = usuarios.getPersona(client.id);
        const mensaje = crearMensaje(data.nombre, data.mensaje);
        client.broadcast.emit("crearMensaje", mensaje);
        callback(mensaje);
    });
    client.on("disconnect", () => {
        const { sala, nombre } = usuarios.borrarPersona(client.id);
        client.leave(sala);
        client.broadcast
            .to(sala)
            .emit(
                "crearMensaje",
                crearMensaje("Administrador", `${nombre} abandonó el chat`)
            );
        const personas = usuarios.getPersonasPorSala(sala);
        client.broadcast.to(sala).emit("listaPersona", personas);
    });
    client.on("mensajePrivado", ({ para, mensaje }) => {
        const { nombre } = usuarios.getPersona(client.id);
        client.to(para).emit("mensajePrivado", crearMensaje(nombre, mensaje));
    });
});
