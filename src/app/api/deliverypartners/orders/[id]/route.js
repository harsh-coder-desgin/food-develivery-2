import { connectionSrt } from "@/lib/db";
import { OrderSchema } from "@/lib/model/orders";
import { Restaurant } from "@/lib/model/restaurant";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  const { id } = await context.params
  let success = false;
  await mongoose.connect(connectionSrt);
  let result = await OrderSchema.find({ deliveryboy_id: id });
  let order = await OrderSchema.find({}, { _id: 1 });
  if (result) {
    let restoData = await Promise.all(
      result.map(async (item) => {
        let restoInfo = {};
        restoInfo.data = await Restaurant.findOne({ _id: item.rest_id })
        restoInfo.amount = item.amount;
        restoInfo.status = item.status;
        restoInfo.id = item._id
        if (order.some(o => o._id.toString() === restoInfo.id.toString())) {
          console.log('Match found:', restoInfo.id);
        }
        return restoInfo;
      })
    )
    result = restoData;
    success = true
  }
  return NextResponse.json({ result, order, success })
}