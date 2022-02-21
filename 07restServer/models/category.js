const { Schema, model } = require("mongoose");
const categorySchema = Schema({
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
});
categorySchema.methods.toJSON = function () {
    const { __v, _id, status, ...category } = this.toObject();
    category.uid = _id;
    return category;
};
module.exports = model("Category", categorySchema);
