const { Schema, model } = require("mongoose");
const roleSchema = Schema({
    role: {
        type: String,
        required: [true, "El rol es obligatorio"],
    },
});

module.exports = model("Roles", roleSchema);
