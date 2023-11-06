const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "../uploads");
        console.log("Destination Path:", uploadPath);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueFilename = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueFilename);

           // Construct the GitHub raw content URL for the file
        //    const githubUrl = baseGitHubUrl + '/' + uniqueFilename;
        //    console.log("GitHub Raw Content URL:", githubUrl);
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

