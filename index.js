// import express from "express";
// import dotenv from "dotenv";
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");



const connectDB=require("./config/db.js")
const userRouter = require("./routes/userRoute.js");

dotenv.config(); 
const PORT =3000 ;
connectDB();
const app = express() // creating instance of express
app.use(express.json())  // to parse json which we will get from fE
app.use(cors());

//routes api
app.use('/api/user',userRouter)

app.get('/', (req, res) => {
    res.send('server is runing!!!baby')
})

app.listen(PORT, ()=>{console.log(`Server is running on port ${PORT}`)})