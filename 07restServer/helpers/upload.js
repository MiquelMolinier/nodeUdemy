const path = require("path");
const { v4: uuidv4 } = require("uuid");
const uploadArchive = (
    files,
    dots = ["png", "jpg", "jpeg", "gif"],
    folder = ""
) => {
    return new Promise((resolve, reject) => {
        const { archive } = files;
        const name = archive.name.split(".");
        const dot = name[name.length - 1];
        if (!dots.includes(dot))
            return reject(
                `La extensión ${dot} no es permitida - Las extensiones permitidas son ${dots}`
            );
        const nameTemp = uuidv4() + "." + dot;
        const uploadPath = path.join(__dirname, "../tmp", folder, nameTemp);

        archive.mv(uploadPath, function (err) {
            if (err) {
                reject(err);
            }
            resolve(nameTemp);
        });
    });
};
module.exports = {
    uploadArchive,
};
