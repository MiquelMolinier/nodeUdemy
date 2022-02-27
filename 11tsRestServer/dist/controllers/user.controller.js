"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.postUser = exports.getUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
/* import db from "../db/connection";
import { QueryTypes } from "sequelize"; */
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.findAll();
    /* const users2 = await db.query(
        "SELECT `id`, `name` as `nombre`, `email` as `correo`, `status` as 'estado' FROM `users` AS `users`;",
        { type: QueryTypes.SELECT }
    ); */
    res.json({
        msg: "get n Users",
        users,
    });
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_1.default.findByPk(id);
    if (!user)
        return res.status(400).json({
            msg: "El usuario no existe",
        });
    res.json({
        msg: "get  1 User",
        id,
        user,
    });
});
exports.getUser = getUser;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const email = yield user_1.default.findOne({ where: { email: body.email } });
        if (email)
            return res.status(400).json({
                msg: "El correo ya existe en la base de datos",
            });
        const user = user_1.default.build(body);
        yield user.save();
        res.json({
            msg: "post Users",
            user,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error en el backend",
        });
    }
});
exports.postUser = postUser;
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const user = yield user_1.default.findByPk(id);
        if (!user)
            return res.status(400).json({
                msg: `No existe usuario con el id ${id}`,
            });
        yield user.update(body);
        console.log("body", body);
        res.json({
            msg: "put Users",
            body,
            id,
        });
    }
    catch (error) { }
});
exports.putUser = putUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_1.default.findByPk(id);
        if (!user)
            return res.status(400).json({
                msg: `No existe usuario con el id ${id}`,
            });
        /* await user.destroy(); */
        yield user.update({ status: 0 });
    }
    catch (error) { }
    res.json({
        msg: "delete Users",
        id,
    });
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.controller.js.map