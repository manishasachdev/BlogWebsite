const mongoose = require("mongoose");

const url ="mongodb+srv://sachdevmanisha38:bAKOnRNnLjdkuY9T@cluster0.5ujytgs.mongodb.net/test?retryWrites=true&w=majority";


const connectDB = async () => {
    try {
        await mongoose.connect(url, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
    } catch(error){
        console.log('err');
        process.exit(1);// kill the terminal
    }
}
module.exports = connectDB;

 // "mongodb+srv://admin:5dEKCbad9uvARLN5@cluster0.xsiblnd.mongodb.net/cineflix?retryWrites=true&w=majority";