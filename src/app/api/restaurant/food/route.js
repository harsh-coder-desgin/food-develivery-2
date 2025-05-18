import { connectionSrt } from "@/lib/db";
import { Fooditem } from "@/lib/model/foods";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
    let payload = await request.json();
    await mongoose.connect(connectionSrt);
    let food = new Fooditem(payload);
    const result = await food.save();
    return NextResponse.json({ result, success: true })
}