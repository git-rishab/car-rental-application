const express = require("express");
const { CarModel } = require("../models/car.model");
const { authorization } = require("../middlewares/jwt.middleware");

const carRoute = express.Router();

carRoute.get("/", async(req,res)=>{
    try {
        const allCars = await CarModel.find();
        res.status(200).json({"ok":true, "cars":allCars});
    } catch (error) {
        res.status(400).json({"ok":false, "message":error.message});
    }
})


carRoute.post("/add", authorization ,async(req,res)=>{
    try {
        const carDetail = new CarModel(req.body)
        await carDetail.save();
        res.status(200).json({"ok":true, "message":"Car Added Successfully"})
    } catch (error) {
        res.status(400).json({"ok":false, "message":error.message});
    }
})

// Particaular car details
carRoute.get("/:carId", async(req,res)=>{
    try {
        const car = req.params.carId;
        const detail = await CarModel.findById(car)
        
        res.status(200).json({"ok":true, detail})
    } catch (error) {
        res.status(400).json({"ok":false, "message":error.message});
    }
})





module.exports = {
    carRoute
}