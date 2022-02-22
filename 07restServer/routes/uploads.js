const { Router, response } = require("express");
const { check } = require("express-validator");
const {
    uploadArch,
    actImg,
    showImg,
    actImgCloud,
    showImgCloud,
} = require("../controllers/uploads");

const { colections } = require("../helpers");
const { validarCampos, existArchive } = require("../middlewares");

const router = new Router();
router.post("/", [existArchive], uploadArch);
router.put(
    "/:colection/:id",
    [
        existArchive,
        check("id", "No es un mongoID").isMongoId(),
        check("colection").custom((c) => colections(c, ["Users", "Product"])),
        validarCampos,
    ],
    actImgCloud
);
router.get(
    "/:colection/:id",
    [
        check("id", "No es un mongoID").isMongoId(),
        check("colection").custom((c) => colections(c, ["Users", "Product"])),
        validarCampos,
    ],
    showImgCloud
);
module.exports = router;
