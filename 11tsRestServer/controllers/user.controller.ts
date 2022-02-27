import { Request, Response } from "express";
import User from "../models/user";
/* import db from "../db/connection";
import { QueryTypes } from "sequelize"; */
export const getUsers = async (req: Request, res: Response) => {
    const users = await User.findAll();
    /* const users2 = await db.query(
        "SELECT `id`, `name` as `nombre`, `email` as `correo`, `status` as 'estado' FROM `users` AS `users`;",
        { type: QueryTypes.SELECT }
    ); */
    res.json({
        msg: "get n Users",
        users,
    });
};
export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user)
        return res.status(400).json({
            msg: "El usuario no existe",
        });
    res.json({
        msg: "get  1 User",
        id,
        user,
    });
};
export const postUser = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const email = await User.findOne({ where: { email: body.email } });
        if (email)
            return res.status(400).json({
                msg: "El correo ya existe en la base de datos",
            });
        const user = User.build(body);
        await user.save();
        res.json({
            msg: "post Users",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error en el backend",
        });
    }
};
export const putUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const user = await User.findByPk(id);
        if (!user)
            return res.status(400).json({
                msg: `No existe usuario con el id ${id}`,
            });
        await user.update(body);
        console.log("body", body);
        res.json({
            msg: "put Users",
            body,
            id,
        });
    } catch (error) {}
};
export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (!user)
            return res.status(400).json({
                msg: `No existe usuario con el id ${id}`,
            });
        /* await user.destroy(); */
        await user.update({ status: 0 });
    } catch (error) {}
    res.json({
        msg: "delete Users",
        id,
    });
};
