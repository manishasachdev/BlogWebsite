const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});



const uploadPicture = multer({
    storage,
    limits: {
        fileSize:1 * 1000000 // 1Mb
    },
    fileFilter: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        if (ext !== ".png" && ext !== ".jpeg" && ext !== ".jpg") {
            return cb(new Error("Invalid image type"));
        }
        cb(null, true); // Accept the file
    }
})

module.exports = uploadPicture;

