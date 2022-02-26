const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
const fileUpload = require("express-fileupload");
const socketController = require("../sockets/socket.js");
class Server {
    constructor() {
        this.port = process.env.PORT;
        this.app = express();
        this.server = require("http").createServer(this.app);
        this.io = require("socket.io")(this.server);
        this.paths = {
            user: "/api/users",
            auth: "/api/auth",
            category: "/api/category",
            product: "/api/product",
            query: "/api/query",
            upload: "/api/uploads",
        };
        // Conectarse a la base de datos
        this.connectdb();
        // Middlewares
        this.middlewares();
        // Rutas de la aplicación
        this.routes();
        //Sockets
        this.sockets();
    }
    async connectdb() {
        await dbConnection();
    }
    sockets() {
        this.io.on("connection", (socket) => socketController(socket, this.io));
    }
    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static("public"));
        this.app.use(
            fileUpload({
                useTempFiles: true,
                tempFileDir: "/tmp/",
                createParentPath: true,
            })
        );
    }
    routes() {
        this.app.use(this.paths.auth, require("../routes/auth"));
        this.app.use(this.paths.user, require("../routes/user"));
        this.app.use(this.paths.category, require("../routes/category"));
        this.app.use(this.paths.product, require("../routes/product"));
        this.app.use(this.paths.query, require("../routes/query"));
        this.app.use(this.paths.upload, require("../routes/uploads"));
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log("Servidor en el puerto", this.port);
        });
    }
}
module.exports = Server;
