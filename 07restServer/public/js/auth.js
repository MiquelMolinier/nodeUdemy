const url = window.location.hostname.includes("localhost")
    ? "http://localhost:8081/api/auth/"
    : "https://restserver-node-mm.herokuapp.com/api/auth/";
const form = document.querySelector("form");
form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const formData = {};
    for (let el of form.elements) {
        if (el.name.length > 0) formData[el.name] = el.value;
    }
    fetch(url + "login", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-type": "application/json" },
    })
        .then((resp) => resp.json())
        .then(({ msg, token }) => {
            if (msg !== "Login ok") return console.error(msg);
            localStorage.setItem("token", token);
            window.location = "/chat.html";
        })
        .catch((err) => {
            console.log("err");
        });
});
function handleCredentialResponse(response) {
    // decodeJwtResponse() is a custom function defined by you
    // to decode the credential response.
    const body = { id_token: response.credential };
    fetch(url + "google", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
        .then((resp) => resp.json())
        .then(({ token, user }) => {
            console.log("Informacion del usuario", user);
            localStorage.setItem("email", user.email);
            localStorage.setItem("token", token);
            window.location = "/chat.html";
        })
        .catch(console.warn);
    console.log("ID TOKEN", response.credential);
}
const button = document.getElementById("google_signout");
button.onclick = () => {
    console.log(google.accounts.id);
    google.accounts.id.disableAutoSelect();
    google.accounts.id.revoke(localStorage.getItem("email"), (done) => {
        localStorage.clear();
        location.reload();
    });
};
