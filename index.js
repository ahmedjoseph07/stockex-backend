require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 4000;
const URL = process.env.MONGO_URL;
const {HoldingsModel} = require("./models/HoldingsModel")
const {PositionsModel} = require("./models/PositionsModel")
const {OrdersModel} = require("./models/OrdersModel")
const app = express();

app.use(cors());
app.use(bodyParser.json());


app.get('/allHoldings',async(req,res)=>{
    let allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
});

app.get('/allPositions',async(req,res)=>{
    let allPositions = await PositionsModel.find({});
    res.json(allPositions);
});

app.post("/newOrder",async(req,res)=>{
    let newOrder = await new OrdersModel({
        name: req.body.name,
        qty: req.body.qty,
        price: req.body.price,
        mode: req.body.mode,
    })
    newOrder.save();
    res.send("order saved");
    console.log("Order Sent");
})



app.listen(PORT,()=>{
    console.log(`App is listing to ${PORT}`);
    mongoose.connect(URL);
    console.log("DB connected");
});