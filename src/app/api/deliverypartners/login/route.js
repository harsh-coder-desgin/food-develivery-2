import { connectionSrt } from "@/lib/db";
import { Deliverypartner } from "@/lib/model/deliverypartner";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
    const payload = await request.json();
    let success = false;
    await mongoose.connect(connectionSrt);
    const result = await Deliverypartner.findOne({ moblie: payload.moblie, password: payload.password })
    if (result) {
        success = true;
    }
    return NextResponse.json({ result, success })
}