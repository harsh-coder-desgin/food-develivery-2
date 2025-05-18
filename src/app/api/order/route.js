import { connectionSrt } from "@/lib/db";
import { OrderSchema } from "@/lib/model/orders";
import { Restaurant } from "@/lib/model/restaurant";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  const payload = await request.json();
  await mongoose.connect(connectionSrt);
  let success = false;
  const orderObj = new OrderSchema(payload);
  const result = await orderObj.save();
  if (result) {
    success = true
  }
  return NextResponse.json({ result, success })
}

export async function GET(request) {
  let userid = request.nextUrl.searchParams.get('id');
  let success = false;
  await mongoose.connect(connectionSrt);
  let result = await OrderSchema.find({ user_Id: userid });
  if (result) {
    let restoData = await Promise.all(
      result.map(async (item) => {
        let restoInfo = {};
        restoInfo.data = await Restaurant.findOne({ _id: item.rest_id })
        restoInfo.amount = item.amount;
        restoInfo.status = item.status;

        return restoInfo;
      })
    )
    result = restoData;
    success = true
  }
  return NextResponse.json({ result, success })
}