require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4000;
const URL = process.env.MONGO_URL;

const app = express();


app.listen(PORT,()=>{
    console.log(`App is listing to ${PORT}`);
    mongoose.connect(URL);
    console.log("DB connected");
})