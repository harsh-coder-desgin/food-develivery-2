import mongoose from "mongoose";
const foodsModel = new mongoose.Schema({
    food:String,
    price:Number,
    image:String,
    description:String,
    rest_id: mongoose.Schema.Types.ObjectId, // Fixed syntax

});

export const Fooditem = mongoose.models.foods || mongoose.model("foods",foodsModel); 