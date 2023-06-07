const express = require("express");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const { UserModel } = require("../models/user.model");

const authRoute = express.Router();

// Google Oauth
authRoute.get(
    "/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
);
authRoute.get(
    "/google/callback",
    passport.authenticate('google', {
        failureRedirect: '/auth/google/failure',
        session: false
    }),
    function (req, res) {
        let user = req.user;
        const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: '1hr' })

        res.redirect(`https://drive-away.netlify.app/dashboard?google=true&id=${user._id}&token=${token}&profilePic=${user.profilePic}`); // chnge the link to frontend
    }
);

authRoute.get("/google/failure", (req, res) => {
    res.redirect("https://drive-away.netlify.app/unauthenticated")
})

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "https://hungry-bandanna-newt.cyclic.app/auth/google/callback", // change the callback link
            passReqToCallback: true
        },
        async function (request, accessToken, refreshToken, profile, cb) {
            const email = profile._json.email;
            const udata = await UserModel.findOne({ email });
            if (udata) {
                return cb(null, udata);
            }
            const name = profile._json.name;
            const profilePic = profile._json.picture || "https://cdn.filestackcontent.com/RuEgtpvGSbidugrFz91z";

            // console.log(name, profilePic, email);
            const user = new UserModel({
                name,
                email,
                pass: uuidv4(),
                profilePic,
                address:"Empty"
            });
            await user.save();
            return cb(null, user);
        }
    )
);

module.exports = {
    authRoute
}