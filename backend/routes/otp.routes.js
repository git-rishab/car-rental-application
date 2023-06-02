const express = require("express");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const { authorization } = require("../middlewares/jwt.middleware");
const { UserModel } = require("../models/user.model");
const { client } = require("../config/db");
const jwt = require("jsonwebtoken");

const otpRoute = express.Router();

otpRoute.get("/generate", authorization, async(req,res)=>{
    try {
        const secret = speakeasy.generateSecret({
            name:"DriveAway"
        })
        await client.set(`${req.user._id}secret`, secret.ascii);
        await client.expire(`${req.user._id}secret`,60*4);

        qrcode.toDataURL(secret.otpauth_url, (err,data)=>{
            if(err){
                return res.status(400).json({ "ok": false, "message": "Something went wrong" })
            }
            res.status(200).send({"ok":true, "QR":data, secret: secret.base32});
        })
    } catch (error) {
        res.status(400).json({ "ok": false, "message": error.message })
    }
})

// Validating the otp for the first time
otpRoute.get("/validate", authorization, async(req,res)=>{
    try {
        const key = await client.get(`${req.user._id}secret`);
        if(!key){
            return res.status(400).send({"ok":false, "message":"OTP expired"});
        }
        const verified = speakeasy.totp.verify({
            secret:key,
            encoding:'ascii',
            token:req.query.otp // otp here
        })

        if(verified){
            await UserModel.findByIdAndUpdate(req.user._id,{twoFA:true, secret:key});
            res.status(200).send({"ok":true, "message":"2FA Enabled Successfully"});
        } else {
            res.status(400).send({"ok":false, "message":"Wrong OTP"});
        }
    } catch (error) {
        res.status(400).json({ "ok": false, "message": error.message })
    }
})

// Verify otp while loggging in
otpRoute.get("/verify", async(req,res)=>{
    try {
        const isUserExist = await UserModel.findById(req.query.id);
        const verified = speakeasy.totp.verify({
            secret:isUserExist.secret,
            encoding:'ascii',
            token: req.query.token // otp here
        })
        if(verified){
            const token = jwt.sign({
                user: isUserExist
            }, process.env.SECRET , { expiresIn: '1h' });

            res.status(200).send({"ok":true, "message":"OTP is correct", token,profilePic:isUserExist.profilePic, id:isUserExist._id});
        } else {
            res.status(400).send({"ok":false, "message":"Wrong OTP"});
        }
    } catch (error) {
        res.status(400).json({ "ok": false, "message": error.message })
    }
})

// Remove Two Factor Authentication
otpRoute.get("/disable", authorization, async(req,res)=>{
    try {
        await UserModel.findByIdAndUpdate(req.user._id, {twoFA:false, secret:''});
        res.status(200).send({"ok":true, "message":"2FA Disabled Successfully"});
    } catch (error) {
        res.status(400).json({ "ok": false, "message": error.message })
    }
})

module.exports = {
    otpRoute
}