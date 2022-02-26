let user = null;
let socket = null;

const txtUid = document.querySelector("#txtUid");
const txtMessage = document.querySelector("#txtMessage");
const ulmessages = document.querySelector("#messages");
const ulusers = document.querySelector("#users");
const btnout = document.querySelector("#btnout");
const url = window.location.hostname.includes("localhost")
    ? "http://localhost:8081/api/auth/"
    : "https://restserver-node-mm.herokuapp.com/api/auth/";
const validatingJwt = async () => {
    const token = localStorage.getItem("token") || "";
    if (token.length <= 10) {
        window.location = "/";
        throw new Error("No hay token en el servidor");
    }
    const resp = await fetch(url, {
        headers: { "x-token": token },
    });
    const { user: userdb, token: tokendb } = await resp.json();
    localStorage.setItem("token", tokendb);
    user = userdb;
    document.title = user.name;
    console.log(user, tokendb);
    await connectSocket();
};
const connectSocket = async () => {
    socket = io({
        extraHeaders: {
            "x-token": localStorage.getItem("token"),
        },
    });
    socket.on("connect", () => {
        console.log("Sockets online");
    });
    socket.on("disconnect", () => {
        console.log("Sockets offline");
    });
    socket.on("receive-messages", drawMessages);
    socket.on("active-users", drawUsers);
    socket.on("private-message", (payload) => {
        console.log(payload);
    });
};
btnout.onclick = () => {
    socket.emit("logout");
    window.location = "/";
};
const main = async () => {
    await validatingJwt();
};
const drawMessages = (messages = []) => {
    let messagesHtml = "";
    messages.forEach(({ name, message }) => {
        messagesHtml += `
            <li>
                <p>
                    <span class="text-primary">${name}: </span>
                    <span>${message}</span>
                </p>
            </li>
            `;
    });
    ulmessages.innerHTML = messagesHtml;
};
const drawUsers = (users = []) => {
    console.log(users);
    let usersHtml = "";
    users.forEach(({ name, uid }) => {
        usersHtml += `
            <li>
                <p>
                    <h5 class="text-success">${name}</h5>
                    <span class="fs-6 text_muted">${uid}</span>
                </p>
            </li>
            `;
    });
    ulusers.innerHTML = usersHtml;
};
txtMessage.addEventListener("keyup", ({ keyCode }) => {
    const message = txtMessage.value;
    if (keyCode !== 13) return;
    if (message.length === 0) return;
    socket.emit("send-message", { message, uid: txtUid.value });
    txtMessage.value = "";
});
main();
// const socket = io();
