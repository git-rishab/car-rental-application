const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { TransactionModel } = require("../models/transaction.model");
const { client } = require("../config/db");
const { authorization } = require("../middlewares/jwt.middleware");
const { UserModel } = require("../models/user.model");
const userRoute = express.Router();
require("dotenv").config();


userRoute.get("/check", authorization , (req,res)=>{
    try {
        res.status(200).send({"ok":true, "message": "User is Logged In", "profilePic":req.user.profilePic, "id":req.user._id});
    } catch (error) {
        res.status(400).json({ "ok": false, "message": error.message })
    }
})

userRoute.post("/register", async (req, res) => {
    try {
        const { name, profilePic, coverPic, aadhar, driving, email, address, pass, captcha } = req.body;
        
        const response = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_KEY}&response=${captcha}` );

        // Check response status and send back to the client-side
        if (!response.data.success) {
            return res.status(200).send({"ok":false, "message": "Please Select proper Images"});
        }
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

                    // res.cookie("token",token);
                    res.status(200).json({"ok":true, "message":"Login Successfull", token})
                    
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
        await client.set(req.headers.authorization,'blacklist');
        await client.expire(req.headers.authorization,3600);
        res.status(200).json({"ok":true, "message":"Logout successfull"});
    } catch (error) {
        res.status(400).json({ "ok": false, "message": error.message })
    }
})

userRoute.get("/", authorization,async(req,res)=>{
    try {
        const user = await UserModel.findById(req.user._id).populate('rentedCars listedCars wishlist');
        res.status(200).json({"ok":true, "data":{
            email:user.email,
            listedCars:user.listedCars,
            address:user.address,
            rentedCars:user.rentedCars,
            wishlist:user.wishlist,
            profilePic:user.profilePic,
            name:user.name
        }});
    } catch (error) {
        res.status(400).json({ "ok": false, "message": error.message })
    }
})

userRoute.patch("/wishlist/add", authorization,async(req,res)=>{
    try {
        const { carId } = req.query;
        await UserModel.findByIdAndUpdate(req.user._id, {
            $addToSet: {wishlist: carId}
        })
        res.status(200).json({"ok":true, "message":"Added to wishlist"});
    } catch (error) {
        res.status(400).json({ "ok": false, "message": error.message })
    }
})

userRoute.patch("/wishlist/remove", authorization, async(req,res)=>{
    try {
        const { carId } = req.query;
        await UserModel.findByIdAndUpdate(
            req.user._id,
            { $pull: { wishlist: carId } }
        );
        res.status(200).json({"ok":true, "message":"Wishlist updated"});
    } catch (error) {
        res.status(400).json({ "ok": false, "message": error.message })
    }
})

module.exports = {
    userRoute
}