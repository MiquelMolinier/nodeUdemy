const socket = io();
const btnSend = document.querySelector("#btnSend");
const txtMessage = document.querySelector("#txtMessage");
const lblOnline = document.querySelector("#lblOnline");
const lblOffline = document.querySelector("#lblOffline");
socket.on("connect", () => {
    console.log("Conectado");
    lblOffline.style.display = "none";
    lblOnline.style.display = "";
});
socket.on("send-message", (payload) => {
    console.log("Desde el server", payload);
});
socket.on("disconnect", () => {
    console.log("Desconectado");
    lblOffline.style.display = "";
    lblOnline.style.display = "none";
});
btnSend.addEventListener("click", () => {
    const message = txtMessage.value;
    console.log(message);
    const payload = {
        message,
        id: "123456789",
    };
    socket.emit("send-message", payload, (id) => {
        console.log("Desde el server", id);
    });
});
