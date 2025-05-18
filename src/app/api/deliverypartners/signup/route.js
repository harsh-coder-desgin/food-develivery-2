import { connectionSrt } from "@/lib/db";
import { Deliverypartner } from "@/lib/model/deliverypartner";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
    let payload = await request.json();
    await mongoose.connect(connectionSrt)
    let user = new Deliverypartner(payload);
    const result = await user.save();
    return NextResponse.json({ result, success: true })
}