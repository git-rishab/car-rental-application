const jwt = require("jsonwebtoken");
const { client } = require("../config/db");
require("dotenv").config();

const authorization = (req,res,next) => {
    const token = req.headers?.authorization;

    jwt.verify(token, process.env.SECRET, async (err, decoded)=> {
        try {
            const blacklist = await client.get(token);
            if(blacklist){
                return res.status(401).json({"ok":false, "message":"Please Login Again"})
            }
            if(err){
                console.log(err.message);
                return res.status(400).json({"ok":false, "message":"Please Login First"})
            }
            if(decoded){
                req.user = decoded.user;
                next();
            }
            
        } catch (error) {
            console.log(error.message);
            res.status(400).json({ "ok": false, "message": "Please Login First" })
        }
    });
}

module.exports = {
    authorization
}