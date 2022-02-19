const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers/auth.controller");
const { validarCampos } = require("../middlewares/validar");
const router = Router();
router.post(
    "/login",
    [
        check("email", "Email is obligatory").isEmail(),
        check("password", "Password is obligatory").not().isEmpty(),
        validarCampos,
    ],
    login
);
router.post(
    "/google",
    [
        check("id_token", "Google token is obligatory").not().isEmpty(),
        validarCampos,
    ],
    googleSignIn
);
module.exports = router;
