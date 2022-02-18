const bcryptjs = require("bcryptjs");
const { response } = require("express");
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
module.exports = {
    login,
};
