const { response } = require("express");
const Category = require("../models/category");
const categoryGet = async (req, res) => {
    const { limit = 5, from = 3 } = req.query;
    const query = { status: true };
    /* const users = await User.find(query).skip(from).limit(limit);
    const total = await User.countDocuments(query); */
    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query).skip(from).limit(limit).populate({
            path: "user",
            select: "name email role -_id",
        }),
    ]);
    res.json({
        total,
        categories,
    });
};
const categoryGetId = async (req, res) => {
    const { id } = req.params;
    const category = await Category.findById(id).populate({
        path: "user",
        select: "name email role -_id",
    });
    if (!category.status)
        return res.status(400).json({
            msg: "La categoría no existe",
        });
    res.json({
        category,
    });
};
const categoryCreate = async (req, res) => {
    const { status, user, type } = req.body;
    const categoryDB = await Category.findOne({ type: type.toUpperCase() });
    if (categoryDB) {
        return res.status(400).json({
            msg: `La categoría ${type} ya existe`,
        });
    }
    const category = new Category({
        type: type.toUpperCase(),
        status,
        user: req.user._id,
    });
    await category.save();
    res.status(201).json({
        category,
    });
};
const categoryUpdate = async (req, res) => {
    const { status, user, ...data } = req.body;
    const { name } = data;
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(
        id,
        {
            type: name.toUpperCase(),
        },
        { returnDocument: "after" }
    );
    res.json({
        category,
    });
};
const categoryDelete = async (req, res) => {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(
        id,
        { status: false },
        { returnDocument: "after" }
    );
    res.json({
        category,
    });
};
module.exports = {
    categoryGet,
    categoryCreate,
    categoryGetId,
    categoryUpdate,
    categoryDelete,
};
