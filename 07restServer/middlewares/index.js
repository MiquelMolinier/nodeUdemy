const validarCampos = require("../middlewares/validar");
const validarJwt = require("../middlewares/validar-jwt");
const validarRol = require("../middlewares/validar-rol");

module.exports = {
    ...validarCampos,
    ...validarJwt,
    ...validarRol,
};
