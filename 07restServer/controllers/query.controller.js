const {
    searchUsers,
    searchProduct,
    searchCategory,
} = require("../helpers/query");

const colections = ["Users", "Category", "Product", "Roles"];

const search = (req, res) => {
    const { colection, term } = req.params;
    if (!colections.includes(colection))
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${colections}`,
        });
    switch (colection) {
        case "Users":
            searchUsers(term, res);
            break;
        case "Product":
            searchProduct(term, res);
            break;
        case "Category":
            searchCategory(term, res);
            break;
        default:
            res.status(500).json({
                msg: "No desarrollado",
            });
            break;
    }
};
module.exports = {
    search,
};
