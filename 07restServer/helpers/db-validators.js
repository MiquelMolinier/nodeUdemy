const Role = require("../models/role");
const User = require("../models/user");
const roleValido = async (role = "") => {
    const existRole = await Role.findOne({ role });
    if (!existRole) {
        throw new Error(`El rol ${role} no está registrado en la DB`);
    }
};
const norole = async (role = "") => {
    const existRole = await Role.findOne({ role });
    if (!existRole && role !== "") {
        throw new Error(`El rol ${role} no está registrado en la DB`);
    }
};
const existEmail = async (email = "") => {
    const exist = await User.findOne({ email });
    if (exist) {
        throw new Error(`El correo ${email} ya está registrado`);
    }
};
const existId = async (id) => {
    const exist = await User.findById(id);
    if (!exist) {
        throw new Error(`El usuario con id ${id} no existe`);
    }
};
module.exports = {
    roleValido,
    existEmail,
    existId,
    norole,
};
