const validarCampos = require("../middlewares/validar");
const validarJwt = require("../middlewares/validar-jwt");
const validarRol = require("../middlewares/validar-rol");
const validarArch = require("../middlewares/validar-archive");
module.exports = {
    ...validarCampos,
    ...validarJwt,
    ...validarRol,
    ...validarArch,
};
