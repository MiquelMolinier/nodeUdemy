const { uploadArchive } = require("../helpers");
const { User, Product } = require("../models");
const path = require("path");
const fs = require("fs");
var cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const { response } = require("express");
const uploadArch = async (req, res) => {
    try {
        const name = await uploadArchive(req.files);
        res.json({
            msg: name,
        });
    } catch (error) {
        res.status(400).json({
            msg: error,
        });
    }
};
const actImg = async (req, res) => {
    const { colection, id } = req.params;
    let model;
    switch (colection) {
        case "Users":
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `El usuario con el id ${id} no existe`,
                });
            }
            break;
        case "Product":
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `El producto con el id ${id} no existe`,
                });
            }
            break;
        default:
            return res.status(500).json({ msg: "No validado" });
    }
    try {
        if (model.img) {
            const pathImg = path.join(
                __dirname,
                "../tmp",
                colection,
                model.img
            );
            if (fs.existsSync(pathImg)) {
                fs.unlinkSync(pathImg);
            }
        }
        const img = await uploadArchive(req.files, undefined, colection);
        model.img = img;
        await model.save();
        res.json({
            model,
        });
    } catch (error) {
        res.json({
            msg: error,
        });
    }
};
const actImgCloud = async (req, res) => {
    const { colection, id } = req.params;
    let model;
    switch (colection) {
        case "Users":
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `El usuario con el id ${id} no existe`,
                });
            }
            break;
        case "Product":
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `El producto con el id ${id} no existe`,
                });
            }
            break;
        default:
            return res.status(500).json({ msg: "No validado" });
    }
    try {
        if (model.img) {
            const urlImg = model.img.split("/");
            const nameImg = urlImg[urlImg.length - 1];
            const [pathImg] = nameImg.split(".");
            cloudinary.uploader.destroy(pathImg);
        }
        const { tempFilePath } = req.files.archive;
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
        model.img = secure_url;
        await model.save();
        res.json({
            model,
        });
    } catch (error) {
        res.json({
            msg: error,
        });
    }
};
const showImgCloud = async (req, res = response) => {
    const { colection, id } = req.params;
    let model;
    switch (colection) {
        case "Users":
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `El usuario con el id ${id} no existe`,
                });
            }
            break;
        case "Product":
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `El producto con el id ${id} no existe`,
                });
            }
            break;
        default:
            return res.status(500).json({ msg: "No validado" });
    }
    try {
        if (model.img) {
            const html = `<img src="${model.img}">`;
            return res.send(html);
        }
        res.sendFile(path.join(__dirname, "../assets/no-image.jpg"));
    } catch (error) {
        res.status(500).json({
            msg: "Error con send file",
        });
    }
};
const showImg = async (req, res = response) => {
    const { colection, id } = req.params;
    let model;
    switch (colection) {
        case "Users":
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `El usuario con el id ${id} no existe`,
                });
            }
            break;
        case "Product":
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `El producto con el id ${id} no existe`,
                });
            }
            break;
        default:
            return res.status(500).json({ msg: "No validado" });
    }
    try {
        if (model.img) {
            const pathImg = path.join(
                __dirname,
                "../tmp",
                colection,
                model.img
            );
            if (fs.existsSync(pathImg)) {
                return res.sendFile(pathImg);
            }
        }
        res.sendFile(path.join(__dirname, "../assets/no-image.jpg"));
    } catch (error) {}
};
module.exports = {
    uploadArch,
    actImg,
    showImg,
    actImgCloud,
    showImgCloud,
};
