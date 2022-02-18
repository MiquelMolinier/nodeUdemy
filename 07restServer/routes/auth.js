const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth.controller");
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

module.exports = router;
