import { connectionSrt } from "@/lib/db";
import { Deliverypartner } from "@/lib/model/deliverypartner";
import mongoose from "mongoose";
import { NextResponse } from "next/server"

export async function GET(request, context) {
    const { city } = await context.params;
    let success = false;
    await mongoose.connect(connectionSrt);
    let filter = { city: { $regex: new RegExp(city, 'i') } }
    const result = await Deliverypartner.find(filter)
    return NextResponse.json({ result });
}