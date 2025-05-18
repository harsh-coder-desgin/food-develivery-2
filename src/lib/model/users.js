import mongoose from "mongoose"
const usersModel = new mongoose.Schema({
        name:String,
        contact:String,
        address:String,
        city:String,
        email:String,
        password:String,
        moblie:String
});

export const Users = mongoose.models.users || mongoose.model("users",usersModel);









// import mongoose from "mongoose";
// const foodsModel = new mongoose.Schema({
//     food:String,
//     price:Number,
//     image:String,
//     description:String,
//     rest_id: mongoose.Schema.Types.ObjectId, // Fixed syntax

// });

// export const Fooditem = mongoose.models.foods || mongoose.model("foods",foodsModel); 