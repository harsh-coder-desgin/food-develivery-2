import { connectionSrt } from "@/lib/db";
import { Restaurant } from "@/lib/model/restaurant";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    await mongoose.connect(connectionSrt);
    let result = await Restaurant.find();
    result = result.map((item) => item?.city?.charAt(0).toUpperCase() + item?.city?.slice(1));
    result = [...new Set(result.map((item) => item))]
    return NextResponse.json({ result, success: true })
}