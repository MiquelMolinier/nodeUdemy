const searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has("escritorio")) {
    window.location = "index.html";
    throw new Error("El escritorio es obligatorio");
}
const desk = searchParams.get("escritorio");
console.log(desk);
// Referencias del HTML
const lblDesk = document.querySelector("h1");
const btnServe = document.querySelector("button");
const lblTicket = document.querySelector("small");
const divAlert = document.querySelector(".alert");
const lblPendientes = document.querySelector("#lblPendientes");
lblDesk.innerText = desk;
divAlert.style.display = "none";
const socket = io();

socket.on("connect", () => {
    console.log("Conectado");
    btnServe.disabled = false;
});

socket.on("disconnect", () => {
    console.log("Desconectado del servidor");
    btnServe.disabled = true;
});

socket.on("enviar-mensaje", (payload) => {
    console.log(payload);
});
socket.on("last-ticket", (payload) => {
    // lblNuevoTicket.innerText = `Ticket ${payload}`;
});
socket.on("update-list", (payload) => {
    // lblNuevoTicket.innerText = `Ticket ${payload}`;
    divAlert.style.display = payload === 0 ? "" : "none";
    lblPendientes.innerText = payload;
    console.log(payload);
});
btnServe.addEventListener("click", () => {
    socket.emit("serve-ticket", { desk }, ({ ok, ticket, msg }) => {
        if (!ok) {
            lblTicket.innerText = "Nadie";
            return (divAlert.style.display = "");
        }
        lblTicket.innerText = `Ticket ${ticket.number}`;
    });
    /* socket.emit("next-ticket", null, (ticket) => {
        console.log("Desde el server", ticket);
        lblNuevoTicket.innerText = ticket;
    }); */
});
