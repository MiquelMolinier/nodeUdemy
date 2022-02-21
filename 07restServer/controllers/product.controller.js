const { response } = require("express");
const Product = require("../models/product");

const productGet = async (req, res) => {
    const { limit, from } = req.query;
    const query = { status: true };
    const [total, products] = await Promise.all([
        Product.find(query).countDocuments(),
        Product.find(query)
            .skip(from)
            .limit(limit)
            .populate({ path: "user", select: "name email role -_id" })
            .populate({ path: "category", select: "type -_id" }),
    ]);
    res.json({
        msg: "Get productos",
        total,
        products,
    });
};
const productGetId = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
        .populate({ path: "user", select: "name email role -_id" })
        .populate({ path: "category", select: "type -_id" });
    if (!product.status)
        return res.json({
            msg: "El producto no existe",
        });
    res.json({
        msg: "Get producto by ID",
        product,
    });
};
const productCreate = async (req, res) => {
    const { user, available, status, type, ...data } = req.body;

    const product = new Product({
        type: type.toUpperCase(),
        user: req.user._id,
        ...data,
    });
    await product.save();
    res.json({
        msg: "Create producto",
        product,
    });
};
const productUpdate = async (req, res) => {
    const { user, status, ...data } = req.body;
    const { id } = req.params;
    if (data.type) data.type = data.type.toUpperCase();

    const product = await Product.findByIdAndUpdate(id, data, {
        returnDocument: "after",
    });
    res.json({
        msg: "Update producto",
        product,
    });
};
const productDelete = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(
        id,
        { status: false },
        { returnDocument: "after" }
    );
    res.json({
        msg: "Delete producto",
        product,
        status: product.status,
    });
};
module.exports = {
    productCreate,
    productDelete,
    productGet,
    productGetId,
    productUpdate,
};
