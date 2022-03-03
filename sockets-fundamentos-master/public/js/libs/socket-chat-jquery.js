//funciones para renderizar usuarios
const params = new URLSearchParams(window.location.search);
const divUsuarios = $("#divUsuarios");
const formEnviar = $("#formEnviar");
const txtMensaje = $("#txtMensaje");
const divChatbox = $("#divChatbox");
function renderizarUsuarios(personas = []) {
    let html = "";
    html += "<li>";
    html += '    <a href="javascript:void(0)" class="active">';
    html += "        Chat de";
    html += `        <span>${params.get("sala")}</span>`;
    html += "    </a>";
    html += "</li>;";
    personas.forEach((persona) => {
        html += `<li>`;
        html += `    <a data-id="${persona.id}"href="javascript:void(0)">`;
        html += `        <img`;
        html += `            src="assets/images/users/1.jpg"`;
        html += `            alt="user-img"`;
        html += `            class="img-circle"`;
        html += `        />`;
        html += `        <span>`;
        html += `            ${persona.nombre}`;
        html += `            <small class="text-success">online</small>`;
        html += `        </span>`;
        html += `    </a>`;
        html += `</li>`;
    });
    divUsuarios.html(html);
}
function renderizarMensajes({ nombre, mensaje, fecha }, id) {
    let html = "";
    const date = new Date(fecha);
    const isAdmin = nombre === "Administrador";
    const info = isAdmin ? "danger" : "info";

    if (id) {
        html += `<li class="reverse">`;
        html += `    <div class="chat-content">`;
        html += `        <h5>${nombre}</h5>`;
        html += `        <div class="box bg-light-inverse">`;
        html += `            ${mensaje}`;
        html += `        </div>`;
        html += `    </div>`;
        html += `    <div class="chat-img">`;
        html += `        <img src="assets/images/users/1.jpg" alt="user" />`;
        html += `    </div>`;
        html += `    <div class="chat-time">${date.getHours()}:${date.getMinutes()}</div>`;
        html += `</li>`;
    } else {
        html += `<li class="animated fadeIn">`;
        if (!isAdmin) {
            html += `    <div class="chat-img">`;
            html += `        <img src="assets/images/users/1.jpg" alt="user" />`;
            html += `    </div>`;
        }
        html += `    <div class="chat-content">`;
        html += `        <h5>${nombre}</h5>`;
        html += `        <div class="box bg-light-${info}">`;
        html += `            ${mensaje}`;
        html += `        </div>`;
        html += `    </div>`;
        html += `    <div class="chat-time">${date.getHours()}:${date.getMinutes()}</div>`;
        html += `</li>`;
    }
    divChatbox.append(html);
}
function scrollBottom() {
    // selectors
    var newMessage = divChatbox.children("li:last-child");

    // heights
    var clientHeight = divChatbox.prop("clientHeight");
    var scrollTop = divChatbox.prop("scrollTop");
    var scrollHeight = divChatbox.prop("scrollHeight");
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (
        clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
        scrollHeight
    ) {
        divChatbox.scrollTop(scrollHeight);
    }
}
//Listeners
divUsuarios.on("click", "a", function () {
    const id = $(this).data("id");
    if (id) {
        console.log(id);
    }
});
formEnviar.on("submit", function (e) {
    e.preventDefault();
    if (txtMensaje.val().trim().length === 0) {
        return;
    }
    socket.emit(
        "crearMensaje",
        {
            nombre: params.get("nombre"),
            mensaje: txtMensaje.val(),
        },
        function (mensaje) {
            txtMensaje.val("").focus();
            console.log("erasdasd", mensaje);
            renderizarMensajes(mensaje, true);
            scrollBottom();
        }
    );
    console.log(txtMensaje.val());
});
