const fs = require("fs");
const path = require("path");

const fileRemover = (filename) => {
    fs.unlink(path.join(__dirname, "../Uploads"), function (err) {
        if (err && err.code == "ENOENT") {
            console.log('file does not exist')
        } else if (err) {
            console.log('error while removing the file')
        } else {
            console.log('removed successfully')
        }
    })
}
module.exports = fileRemover;

