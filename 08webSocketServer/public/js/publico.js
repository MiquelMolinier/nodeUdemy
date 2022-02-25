const lblTicket1 = document.querySelector("#lblTicket1");
const lblTicket2 = document.querySelector("#lblTicket2");
const lblTicket3 = document.querySelector("#lblTicket3");
const lblTicket4 = document.querySelector("#lblTicket4");
const lblEscritorio1 = document.querySelector("#lblEscritorio1");
const lblEscritorio2 = document.querySelector("#lblEscritorio2");
const lblEscritorio3 = document.querySelector("#lblEscritorio3");
const lblEscritorio4 = document.querySelector("#lblEscritorio4");
const socket = io();

socket.on("last-tickets", (payload) => {
    const audio = new Audio("../audio/new-ticket.mp3");
    audio.play();
    console.log(payload);
    const [ticket1, ticket2, ticket3, ticket4] = payload;
    lblTicket1.innerText = ticket1 ? `Ticket ${ticket1.number}` : "Libre";
    lblTicket2.innerText = ticket2 ? `Ticket ${ticket2.number}` : "Libre";
    lblTicket3.innerText = ticket3 ? `Ticket ${ticket3.number}` : "Libre";
    lblTicket4.innerText = ticket4 ? `Ticket ${ticket4.number}` : "Libre";
    lblEscritorio1.innerText = ticket1 ? `${ticket1.desk}` : "";
    lblEscritorio2.innerText = ticket2 ? `${ticket2.desk}` : "";
    lblEscritorio3.innerText = ticket3 ? `${ticket3.desk}` : "";
    lblEscritorio4.innerText = ticket4 ? `${ticket4.desk}` : "";
});
console.log("Público HTML");
