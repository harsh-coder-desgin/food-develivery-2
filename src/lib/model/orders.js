import mongoose from "mongoose";

const orderModel = new mongoose.Schema({
    user_Id:mongoose.Schema.Types.ObjectId,
    foodItemIds:String,
    rest_id:mongoose.Schema.Types.ObjectId,
    deliveryboy_id:mongoose.Schema.Types.ObjectId,
    status:String,
    amount:String
}); // Explicitly setting collection name if needed
export const OrderSchema = mongoose.models.orders || mongoose.model("orders",orderModel);