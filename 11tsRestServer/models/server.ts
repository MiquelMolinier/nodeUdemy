import express from "express";
import userRoutes from "../routes/user.route";
import cors from "cors";
import db from "../db/connection";
class Server {
    private app: express.Application;
    private port: string;
    private paths = {
        users: "/api/users",
    };
    constructor() {
        this.app = express();
        this.port = process.env.PORT || "8000";
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    async dbConnection() {
        try {
            await db.authenticate();
            console.log("Database online");
        } catch (error: any) {
            throw new Error(error);
        }
    }
    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static("public"));
    }
    routes() {
        this.app.use(this.paths.users, userRoutes);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor en el puerto ${this.port}`);
        });
    }
}
export default Server;
