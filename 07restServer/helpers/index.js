const dbValidator = require("./db-validators");
const jwt = require("./jwt");
const google = require("./google-verify");
const upload = require("./upload");
const query = require("./query");
module.exports = {
    ...dbValidator,
    ...jwt,
    ...google,
    ...upload,
    ...query,
};
