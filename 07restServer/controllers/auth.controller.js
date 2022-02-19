const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { json } = require("express/lib/response");
const { googleVerify } = require("../helpers/google-verify");
const { generateJWT } = require("../helpers/jwt");
const User = require("../models/user");
const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: "Incorrect email",
            });
        }
        if (!user.state) {
            return res.status(400).json({
                msg: "User is not active",
            });
        }
        const validate = bcryptjs.compareSync(password, user.password);
        if (!validate) {
            return res.status(400).json({
                msg: "Incorrect password",
            });
        }
        const token = await generateJWT(user._id);
        res.json({
            msg: "Login ok",
            token,
            user,
        });
    } catch (error) {
        res.status(500).json({
            msg: error,
        });
    }
};
const googleSignIn = async (req, res = response) => {
    const { id_token } = req.body;
    try {
        const { name, email, img } = await googleVerify(id_token);
        let user = await User.findOne({ email });
        if (!user) {
            const data = {
                img,
                email,
                name,
                password: ":b",
                google: true,
                role: "USER_ROLE",
            };
            user = new User(data);
            await user.save();
        }
        if (!user.state) {
            return res.status(401).json({
                msg: "Talk with the administrator, user blocked",
            });
        }
        const token = await generateJWT(user._id);
        res.json({
            msg: "Ok google sign in",
            token,
            user,
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "El token no se pudo verificar",
        });
    }
};
module.exports = {
    login,
    googleSignIn,
};
