const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { TransactionModel } = require("../models/transaction.model");
const { client } = require("../config/db");
const { authorization } = require("../middlewares/jwt.middleware");
const { UserModel } = require("../models/user.model");
const userRoute = express.Router();
require("dotenv").config();

userRoute.post("/register", async (req, res) => {
    try {
        const { name, profilePic, coverPic, aadhar, driving, email, address, pass } = req.body;
        const isUserExist = await UserModel.findOne({ email });
        if(isUserExist){
            return res.status(400).json({ "ok": false, "message": "User Already Exist" })
        }
        bcrypt.hash(pass, 5, async (err, hash) => {
            try {
                const userData = new UserModel({
                    name, profilePic, coverPic, aadhar, driving, email:email.toLowerCase(), address, pass: hash
                })
                const transaction = new TransactionModel({userId:userData._id});
                userData.transaction = transaction._id;
                await userData.save();
                await transaction.save();
                
                res.status(200).json({ "ok": true, "message": "Registration successfull" });
            } catch (error) {
                res.status(400).json({ "ok": false, "message": error.message })
            }
        });


    } catch (error) {
        res.status(400).json({ "ok": false, "message": error.message })
    }
})

userRoute.post("/login", async (req, res) => {
    try {
        const { email, pass } = req.body;
        const isUserExist = await UserModel.findOne({ email:email.toLowerCase() });
        if (isUserExist) {

            bcrypt.compare(pass, isUserExist.pass, async (err, result)=> {
                // result == true
                if(result){
                    const token = jwt.sign({
                        user: isUserExist
                    }, process.env.SECRET , { expiresIn: '1h' });

                    res.cookie("token",token);
                    res.status(200).json({"ok":true, "message":"Login Successfull"})
                    
                } else {
                    res.status(401).json({ "ok": false, "message": "Wrong Credentials" });
                }
            });
        } else {
            res.status(401).json({ "ok": false, "message": "Please Register First" });
        }

    } catch (error) {
        res.status(400).json({ "ok": false, "message": error.message })
    }
})

userRoute.get("/logout", async(req,res)=>{
    try {
        await client.set(req.cookies.token,'blacklist');
        await client.expire(req.cookies.token,3600);
        res.status(200).json({"ok":true, "message":"Logout successfull"});
    } catch (error) {
        res.status(400).json({ "ok": false, "message": error.message })
    }
})


module.exports = {
    userRoute
}