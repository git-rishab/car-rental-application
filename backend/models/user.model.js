const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    profilePic: {
        type:String,
        default:"https://cdn.filestackcontent.com/RuEgtpvGSbidugrFz91z"
    },
    coverPic : {
        type:String,
        default:"https://img.freepik.com/free-photo/white-paper-background-simple-diy-craft_53876-146283.jpg"
    },
    aadhar: {
        type:String
    },
    driving: {
        type:String
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    pass: {
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    isVerified: {
        type:Boolean,
        default:false
    },
    isBlock:{
        type:Boolean,
        default:false
    },
    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'car'
        }
    ],
    transaction: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'transaction'
    },
    rentedCars: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'car'
        }
    ],
    listedCars: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'car'
        }
    ],
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    }
},{
    versionKey:false
})

const UserModel = mongoose.model("user",userSchema);

module.exports = {
    UserModel
}