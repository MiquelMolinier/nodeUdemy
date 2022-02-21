const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT, isAdmin } = require("../middlewares");
const { validarCampos } = require("../middlewares/validar");
const {
    existId,
    existCategory,
    existName,
    existNameProduct,
    existProduct,
} = require("../helpers/db-validators");
const {
    productGet,
    productGetId,
    productCreate,
    productUpdate,
    productDelete,
} = require("../controllers/product.controller");

const router = Router();
router.get(
    "/",
    [
        check("limit", "El limite debe ser un numero entero").isInt(),
        check("from", "El desde debe ser un numero entero").isInt(),
    ],
    productGet
);
router.get(
    "/:id",
    [
        check("id", "No es un id válido").isMongoId(),
        check("id", "El id no existe").custom(existProduct),
        validarCampos,
    ],
    productGetId
);
// Token
router.post(
    "/",
    [
        validateJWT,
        check("type", "El nombre es obligatorio").not().isEmpty(),
        check("type").custom(existNameProduct),
        check("category", "No es un ID válido").isMongoId(),
        check("category", "El ID no existe").custom(existCategory),
        validarCampos,
    ],
    productCreate
);
// Token
router.put(
    "/:id",
    [
        validateJWT,
        check("id", "No es un id válido").isMongoId(),
        check("id", "El id no existe").custom(existProduct),
        check("type").custom(existNameProduct),
        validarCampos,
    ],
    productUpdate
);
// Admin
router.delete(
    "/:id",
    [
        validateJWT,
        isAdmin,
        check("id", "No es un id válido").isMongoId(),
        check("id", "El id no existe").custom(existProduct),
        validarCampos,
    ],
    productDelete
);
module.exports = router;
