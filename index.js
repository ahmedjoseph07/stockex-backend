require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/AuthRoute");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 4000;
const URL = process.env.MONGO_URL;
const {HoldingsModel} = require("./models/HoldingsModel")
const {PositionsModel} = require("./models/PositionsModel")
const {OrdersModel} = require("./models/OrdersModel")

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors(
    {
        origin: ["https://stockex-clientsite.vercel.app","https://stockex-dashboard.vercel.app"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }
));
app.use(bodyParser.json());

app.listen(PORT,()=>{
    console.log(`App is listing to ${PORT}`);
    mongoose.connect(URL);
    console.log("DB connected");
});

app.get("/allHoldings",async(req,res)=>{
    let allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
});

app.get("/allPositions",async(req,res)=>{
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

app.use("/", authRoute);