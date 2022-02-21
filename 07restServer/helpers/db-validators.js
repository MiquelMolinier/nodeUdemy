const Category = require("../models/category");
const Product = require("../models/product");
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
const existCategory = async (id) => {
    const exist = await Category.findById(id);
    if (!exist) {
        throw new Error(`La categoría con id ${id} no existe`);
    }
};
const existProduct = async (id) => {
    const exist = await Product.findById(id);
    if (!exist) {
        throw new Error(`El producto con id ${id} no existe`);
    }
};
const existName = async (name) => {
    const exist = await Category.findOne({ type: name.toUpperCase() });
    if (exist) throw new Error(`El nombre de categoría ${name} ya existe`);
};
const existNameProduct = async (name) => {
    if (name) {
        const exist = await Product.findOne({ type: name.toUpperCase() });
        if (exist) throw new Error(`El nombre del producto ${name} ya existe`);
    }
};
module.exports = {
    roleValido,
    existEmail,
    existId,
    norole,
    existCategory,
    existName,
    existNameProduct,
    existProduct,
};
