const express = require("express");
const cookie = require("cookie-parser");
const cors = require("cors");
const {logger} = require("./middlewares/logger.middleware");
const { connection, client } = require("./config/db");
const { userRoute } = require("./routes/user.routes");
const { carRoute } = require("./routes/car.routes");
const { otpRoute } = require("./routes/otp.routes");
const { authRoute } = require("./routes/auth.routes");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cookie());
app.use(cors());
app.use(logger);

app.get("/", (req,res)=>{
    res.status(200).json({"ok":true, "message":"Welcome to Homepage"});
})

app.use("/user",userRoute);
app.use("/car", carRoute);
app.use("/otp", otpRoute);
app.use("/auth", authRoute);


app.get("*",(req,res)=>{
    res.status(400).json({"ok":false, "message":"No such route exist"});
})

app.post("*",(req,res)=>{
    res.status(400).json({"ok":false, "message":"No such route exist"});
})

app.listen(process.env.PORT, async()=>{
    try {
        await connection
        console.log("MongoDB connected");
        await client.connect();
        console.log("Redis Connected");
    } catch (error) {
        console.log("Database not connected");
    }
    console.log(`Server running at PORT ${process.env.PORT}`);
})