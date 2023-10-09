// import { Schema, model } from "mongoose";

// const USerSchema = new Schema(
//   {
//     avtar: { type: String, default: "" },
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     password: { type: String, required: true },
//     verified: { type: Boolean, default: false },
//     verificationCode: { type: String, required: false },
//     admin: { type: Boolean, default: false },
//   },
//   {
//     timestamps: true,
//   }
// );
// const Users = model("User", USerSchema)
// export default Users;


const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const JWT_SECRET = "12345";
//create schema same ad we created in db
const UserSchema = new mongoose.Schema(
  {
    avtar: { type: String, default: "" },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    verificationCode: { type: String, required: false },
    admin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
       this.password = await bcrypt.hash(this.password, 10);
        return next()
    }
    return next()
})
 
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

UserSchema.methods.generateJWT = async function () {
  return await jwt.sign({ id: this._id }, JWT_SECRET, {
    expiresIn: "30d",
  });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
