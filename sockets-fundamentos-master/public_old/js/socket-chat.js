var socket = io();
const params = new URLSearchParams(window.location.search);
if (!params.has("nombre") || !params.has("sala")) {
    window.location = "/";
    throw new Error("El nombre es necesario");
}
var usuario = {
    nombre: params.get("nombre"),
    sala: params.get("sala"),
};
socket.on("connect", function () {
    socket.emit("entrarChat", usuario, (msg) => {
        console.log(msg);
    });
});
socket.on("listaPersona", (personas) => {
    console.log(personas);
});
socket.on("crearMensaje", (payload) => {
    console.log(payload);
});
// escuchar
socket.on("disconnect", function () {
    console.log("Perdimos conexión con el servidor");
});
socket.on("mensajePrivado", (mensaje) => {
    console.log("Mensaje privado:", mensaje);
});
