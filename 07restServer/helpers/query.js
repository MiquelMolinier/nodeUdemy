const { User, Category, Product, Role } = require("../models/index");

const { ObjectId } = require("mongoose").Types;
const searchUsers = async (term, res) => {
    const mongoId = ObjectId.isValid(term);
    let user = null;
    if (mongoId) {
        user = await User.findById(term);
        return res.json({
            results: user ? [user] : [],
        });
    } else {
        const regex = new RegExp(term, "i");
        user = await User.find({
            $or: [{ name: regex }, { email: regex }],
            $and: [{ state: true }],
        });
        return res.json({
            results: user,
        });
    }
};
const searchProduct = async (term, res) => {
    const mongoId = ObjectId.isValid(term);
    if (mongoId) {
        const product = await Product.findById(term)
            .populate({ path: "user", select: "name email role -_id" })
            .populate({ path: "category", select: "type -_id" });
        return res.json({
            results: product && product.status ? [product] : [],
        });
    } else {
        const regex = new RegExp(term, "i");
        const product = await Product.find({ type: regex, status: true })
            .populate({ path: "user", select: "name email role -_id" })
            .populate({ path: "category", select: "type -_id" });
        return res.json({
            results: product,
        });
    }
};
const searchCategory = async (term, res) => {
    const mongoId = ObjectId.isValid(term);
    if (mongoId) {
        const category = await Category.findById(term).populate({
            path: "user",
            select: "name email role -_id",
        });
        return res.json({
            results: category && category.status ? [category] : [],
        });
    } else {
        const regex = new RegExp(term, "i");
        const category = await Category.find({
            type: regex,
            status: true,
        }).populate({
            path: "user",
            select: "name email role -_id",
        });
        return res.json({
            results: category,
        });
    }
};
module.exports = {
    searchUsers,
    searchProduct,
    searchCategory,
};
