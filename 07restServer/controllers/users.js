const { response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const userGet = async (req, res) => {
    const { limit = 5, from = 3 } = req.query;
    const query = { state: true };
    /* const users = await User.find(query).skip(from).limit(limit);
    const total = await User.countDocuments(query); */
    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query).skip(from).limit(limit),
    ]);

    res.json({
        total,
        users,
    });
};
const userPost = async (req, res) => {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    //Guardar en DB
    await user.save();
    res.json({
        msg: "post API controller",
        user,
    });
};
const userPut = async (req, res) => {
    const { id } = req.params;
    const { _id, password, google, ...rest } = req.body;
    // TODO validar contra base de datos
    if (password) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }
    console.log(rest);
    const user = await User.findByIdAndUpdate(id, rest);
    res.json({
        msg: "put API controller",
        id,
        user,
    });
};
const userDelete = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { state: false });
    res.json({
        msg: "delete API controller",
        user,
        uid: req.uid,
        admin: req.user,
    });
};
module.exports = {
    userDelete,
    userGet,
    userPut,
    userPost,
};
