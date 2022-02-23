const express = require("express");
const cors = require("cors");
const { socketController } = require("../sockets/controller");

class Server {
    constructor() {
        this.port = process.env.PORT;
        this.app = express();
        this.paths = {};
        this.server = require("http").createServer(this.app);
        this.io = require("socket.io")(this.server);
        // Conectarse a la base de datos
        // Middlewares
        this.middlewares();
        // Rutas de la aplicación
        this.routes();
        // Sockets
        this.sockets();
    }
    sockets() {
        this.io.on("connection", socketController);
    }
    middlewares() {
        this.app.use(cors());
        this.app.use(express.static("public"));
    }
    routes() {}
    listen() {
        this.server.listen(this.port, () => {
            console.log("Servidor en el puerto", this.port);
        });
    }
}
module.exports = Server;
