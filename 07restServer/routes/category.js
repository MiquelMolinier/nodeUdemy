const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT, haveRole, isAdmin } = require("../middlewares");
const { validarCampos } = require("../middlewares/validar");
const {
    existId,
    existCategory,
    existName,
} = require("../helpers/db-validators");
const {
    categoryCreate,
    categoryGet,
    categoryGetId,
    categoryUpdate,
    categoryDelete,
} = require("../controllers/category.controller");
const router = Router();
router.get(
    "/",
    check("limit", "El limite debe ser un numero entero").isInt(),
    check("from", "El desde debe ser un numero entero").isInt(),
    categoryGet
);
router.get(
    "/:id",
    [
        check("id", "No es un id válido").isMongoId(),
        check("id", "El id no existe").custom(existCategory),
        validarCampos,
    ],
    categoryGetId
);
// Token
router.post(
    "/",
    [
        validateJWT,
        check("type", "El nombre es obligatorio").not().isEmpty(),
        check("type", "El nombre de la categoría ya existe").custom(existName),
        validarCampos,
    ],
    categoryCreate
);
// Token
router.put(
    "/:id",
    [
        validateJWT,
        check("id", "No es un id válido").isMongoId(),
        check("id", "El id no existe").custom(existCategory),
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("name").custom(existName),
        validarCampos,
    ],
    categoryUpdate
);
// Admin
router.delete(
    "/:id",
    [
        validateJWT,
        isAdmin,
        check("id", "No es un id válido").isMongoId(),
        check("id", "El id no existe").custom(existCategory),
        validarCampos,
    ],
    categoryDelete
);
module.exports = router;
