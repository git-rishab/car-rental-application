const jwt = require("jsonwebtoken");
const { client } = require("../config/db");
require("dotenv").config();

const authorization = (req,res,next) => {
    const token = req.cookies.token;

    jwt.verify(token, process.env.SECRET, async (err, decoded)=> {
        try {
            const blacklist = await client.get(token);
            if(blacklist){
                return res.status(401).json({"ok":false, "message":"Please Login Again"})
            }
            if(err){
                return res.status(400).json({"ok":false, "message":err.message})
            }
            if(decoded){
                req.user = decoded.user;
                next();
            }
            
        } catch (error) {
            res.status(400).json({ "ok": false, "message": error.message })
        }
    });
}

module.exports = {
    authorization
}