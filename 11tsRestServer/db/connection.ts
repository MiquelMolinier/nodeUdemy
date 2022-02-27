import { Sequelize } from "sequelize";
const db = new Sequelize("node", "wsl2", "", {
    host: "172.17.144.1", // localhost == 172.17.144.1 in WSL
    dialect: "mysql",
    port: 3306,
    // logging:false,
});
export default db;
