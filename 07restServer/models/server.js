const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
class Server {
    constructor() {
        this.port = process.env.PORT;
        this.app = express();
        this.usersPath = "/api/users";
        this.authPath = "/api/auth";
        // Conectarse a la base de datos
        this.connectdb();
        // Middlewares
        this.middlewares();
        // Rutas de la aplicación
        this.routes();
    }
    async connectdb() {
        await dbConnection();
    }
    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static("public"));
    }
    routes() {
        this.app.use(this.authPath, require("../routes/auth"));
        this.app.use(this.usersPath, require("../routes/user"));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor en el puerto", this.port);
        });
    }
}
module.exports = Server;
