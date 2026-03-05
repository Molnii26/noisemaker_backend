const multer = require("multer")
const fs = require("fs")
const path = require("path")

const MAX_FILE_SIZE = 1024 * 1024 * 5

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        const uploadDir = path.join(process.cwd(), "uploads", "products");

        try {
            fs.mkdirSync(uploadDir, { recursive: true });
            cb(null, uploadDir);
        } catch (err) {
            cb(err, null);
        }
    },

    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpg|jpeg|png|webp/;
        const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = file.mimetype

        if (extName && mimeType) {
            cb(null, true);
        } else {
            cb(new Error("Csak képformátum megengedett"), null);
        }
    }
});

module.exports = { upload };