const express = require("express");
const { CarModel } = require("../models/car.model");
const { authorization } = require("../middlewares/jwt.middleware");
const { UserModel } = require("../models/user.model");
require("dotenv").config();
const stripe = require('stripe')(process.env.PAYMENT_SECRET);


const carRoute = express.Router();

// Get all cars
carRoute.get("/", async (req, res) => {
    try {
        const allCars = await CarModel.find();
        res.status(200).json({ "ok": true, "cars": allCars });
    } catch (error) {
        res.status(400).json({ "ok": false, "message": error.message });
    }
})



// Add a new car
carRoute.post("/add", authorization, async (req, res) => {
    try {
        const data = {
            ...req.body,
            listedBy: req.user._id,
            heroImg: req.body.images[0]
        }
        const carDetail = new CarModel(data);
        await UserModel.findByIdAndUpdate(req.user._id, {
            $push: { listedCars: carDetail._id }
        })
        await carDetail.save();
        res.status(200).json({ "ok": true, "message": "Car Added Successfully" })
    } catch (error) {
        res.status(400).json({ "ok": false, "message": error.message });
    }
})


carRoute.post('/payment', authorization,async(req,res) => {
    try {
        const { name, description, price, day, start, end, id } = req.body;
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: name,
                            description: description,
                            // images: ['https://example.com/tshirt-image.jpg'],
                        },
                        unit_amount: 100* +price* +day,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `https://drive-away.netlify.app/dashboard?events=paymentsuccess&id=${id}&start=${start}&end=${end}`,
            cancel_url: 'https://drive-away.netlify.app/dashboard?events=paymentfailure',
        });
        res.status(303).send({"ok":true,"url":session.url});
    } catch (error) {
        console.log("error",error.message);
        res.redirect(`http://localhost:3000/abc`) // frontend link
    }
}); 


// Edit a car detail
carRoute.patch("/edit", authorization, async (req, res) => {
    try {
        const { carId } = req.query;
        await CarModel.findByIdAndUpdate(carId, req.body);
        res.status(200).json({ "ok": true, "message": "Car details updated Successfully" })
    } catch (error) {
        res.status(400).json({ "ok": false, "message": error.message });
    }
})


// Rent a car
carRoute.patch("/rent", authorization, async (req, res) => {
    try {
        const { carId } = req.query;
        await UserModel.findByIdAndUpdate(req.user._id, {
            $push: { renntedCars: carId }
        })

        res.status(200).json({ "ok": true, "message": "Car Rented Successfully" })
    } catch (error) {
        res.status(400).json({ "ok": false, "message": error.message });
    }
})

// Delete a car
carRoute.delete("/delete", authorization, async (req, res) => {
    try {
        const { carId } = req.query;
        await CarModel.findByIdAndDelete(carId);
        res.status(200).json({ "ok": true, "message": "Car Deleted Successfully" })
    } catch (error) {
        res.status(400).json({ "ok": false, "message": error.message });
    }
})

// Particaular car details
carRoute.get("/:carId", async (req, res) => {
    try {
        const car = req.params.carId;
        const detail = await CarModel.findById(car)

        res.status(200).json({ "ok": true, detail })
    } catch (error) {
        res.status(400).json({ "ok": false, "message": error.message });
    }
})

module.exports = {
    carRoute
}