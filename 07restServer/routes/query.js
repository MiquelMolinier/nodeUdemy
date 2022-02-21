const { Router, response } = require("express");
const { search } = require("../controllers/query.controller");
const router = new Router();
router.get("/:colection/:term", search);
module.exports = router;
