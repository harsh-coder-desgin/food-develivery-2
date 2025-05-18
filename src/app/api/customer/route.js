import { connectionSrt } from "@/lib/db";
import { Restaurant } from "@/lib/model/restaurant";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
    let queryParams = request.nextUrl.searchParams;
    let filter = {}
    if (queryParams.get("location")) {
        let city = queryParams.get("location");
        filter = { city: { $regex: new RegExp(city, 'i') } }
    } else if (queryParams.get("restaurant")) {
        let name = queryParams.get("restaurant");
        filter = { name: { $regex: new RegExp(name, 'i') } }
    }
    await mongoose.connect(connectionSrt)
    let result = await Restaurant.find(filter)
    return NextResponse.json({ success: true, result })
}