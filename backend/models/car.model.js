const mongoose = require("mongoose");

const carSchema = mongoose.Schema({
    heroImg:{
        type:String,
        required:true
    },
    images:{
        type:Array,
        required:true,
        default:[]
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    listedBy:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    listedDate:{
        type:Date,
        required:true
    },
    rentPrice:{
        type:Number,
        required:true
    },
    fuelCapacity:{
        type:Number,
        required:true
    },
    transmission:{
        type:String,
        required:true,
        enum:['Automatic', 'Manual']
    },
    capacity:{
        type:String,
        required:true,
        enum:['2','4','6','8 or more']
    },
    carType:{
        type:String,
        required:true,
        enum:['Sport', 'SUV', 'MPV', 'Sedan', 'Coupe', 'Hatchback']
    }
})

const CarModel = mongoose.model('car',carSchema);

module.exports = {
    CarModel
}