const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
class Server {
    constructor() {
        this.port = process.env.PORT;
        this.app = express();
        this.paths = {
            user: "/api/users",
            auth: "/api/auth",
            category: "/api/category",
            product: "/api/product",
            query: "/api/query",
        };
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
        this.app.use(this.paths.auth, require("../routes/auth"));
        this.app.use(this.paths.user, require("../routes/user"));
        this.app.use(this.paths.category, require("../routes/category"));
        this.app.use(this.paths.product, require("../routes/product"));
        this.app.use(this.paths.query, require("../routes/query"));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor en el puerto", this.port);
        });
    }
}
module.exports = Server;
