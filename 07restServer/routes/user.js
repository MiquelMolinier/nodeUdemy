const { Router } = require("express");
const { check } = require("express-validator");
const Role = require("../models/role");
const {
    userGet,
    userPost,
    userPut,
    userDelete,
} = require("../controllers/users");
const { validarCampos } = require("../middlewares/validar");
const {
    roleValido,
    existEmail,
    existId,
    norole,
} = require("../helpers/db-validators");
const router = Router();
router.get(
    "/",
    [
        check("limit", "No es un número entero").isInt(),
        check("from", "No es un número entero").isInt(),
        validarCampos,
    ],
    userGet
);
router.post(
    "/",
    [
        check("email", "El correo no es válido").isEmail(),
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check(
            "password",
            "La contraseña debe de ser de más de 8 letras"
        ).isLength({ min: 8 }),
        // check("role", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
        check("role").custom(roleValido),
        check("email").custom(existEmail),
        (req, res, next) => validarCampos(req, res, next),
    ],
    userPost
);
router.put(
    "/:id",
    [
        check("role").custom(norole),
        check("id", "No es un ID válido").isMongoId(),
        check("id", "El ID no existe").custom(existId),
        validarCampos,
    ],
    userPut
);
router.delete(
    "/:id",
    [
        check("id", "No es un ID válido").isMongoId(),
        check("id", "El ID no existe").custom(existId),
        validarCampos,
    ],
    userDelete
);

module.exports = router;
