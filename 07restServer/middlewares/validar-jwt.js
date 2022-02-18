const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const validateJWT = async (req = request, res = response, next) => {
    const token = req.header("x-token");
    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la petición",
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.PRIVATEKEY);
        const user = await User.findById(uid);
        if (!user)
            return res.status(401).json({
                msg: "Usuario no existe",
            });
        if (!user.state)
            return res.status(401).json({
                msg: "El usuario no esta activo",
            });
        req.user = user;
        req.uid = uid;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Token no válido",
        });
    }
};
module.exports = {
    validateJWT,
};
