import mongoose from "mongoose";

const restaurantModel = new mongoose.Schema({
    name:String,
    contact:String,
    address:String,
    city:String,
    email:String,
    password:String
}, { collection: "Restaurants" });  // Explicitly setting collection name if needed
export const Restaurant = mongoose.models.Restaurants || mongoose.model("Restaurants",restaurantModel);