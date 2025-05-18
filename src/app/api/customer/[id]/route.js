import { connectionSrt } from "@/lib/db";
import { Fooditem } from "@/lib/model/foods";
import { Restaurant } from "@/lib/model/restaurant";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, context) {
    const { id } = await context.params;
    await mongoose.connect(connectionSrt);
    const detail = await Restaurant.findOne({ _id: id })
    const fooditems = await Fooditem.find({ rest_id: id })
    return NextResponse.json({ success: true, detail, fooditems })
}