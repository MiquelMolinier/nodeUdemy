const { response } = require("express");

const userGet = (req, res) => {
    res.json({
        msg: "get API controller",
    });
};
const userPost = (req, res) => {
    const { name, age } = req.body;
    res.json({
        msg: "post API controller",
        name,
        age,
    });
};
const userPut = (req, res) => {
    const id = req.params.id;
    const { q, nombre = "No name", apikey, page = 1, limit } = req.query;
    res.json({
        msg: "put API controller",
        id,
        q,
        nombre,
        apikey,
        page,
        limit,
    });
};
const userDelete = (req, res) => {
    res.json({
        msg: "delete API controller",
    });
};
module.exports = {
    userDelete,
    userGet,
    userPut,
    userPost,
};
