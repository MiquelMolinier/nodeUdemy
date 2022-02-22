const { Schema, model } = require("mongoose");
const productSchema = Schema({
    type: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        unique: true,
    },
    status: {
        type: Boolean,
        default: true,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    price: {
        type: Number,
        default: 0,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    img: {
        type: String,
    },
    desc: {
        type: String,
        default: "",
    },
    available: {
        type: Boolean,
        default: true,
    },
});
productSchema.methods.toJSON = function () {
    const { __v, _id, status, ...product } = this.toObject();
    product.uid = _id;
    return product;
};
module.exports = model("Product", productSchema);
