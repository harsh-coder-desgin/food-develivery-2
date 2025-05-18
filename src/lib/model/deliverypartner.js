import mongoose from "mongoose"
const deliverypartnerModel = new mongoose.Schema({
        name:String,
        moblie:String,
        address:String,
        city:String,
        password:String
});

export const Deliverypartner = mongoose.models.deliverypartners || mongoose.model("deliverypartners",deliverypartnerModel);



