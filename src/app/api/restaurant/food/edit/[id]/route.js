import { connectionSrt } from "@/lib/db";
import { Fooditem } from "@/lib/model/foods";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, context) {
    const { id } = await context.params;
    await mongoose.connect(connectionSrt);
    let data = await Fooditem.findOne({ _id: id });
    return NextResponse.json({ data, success: true });
}

export async function PUT(request, context) {
    const { id } = await context.params;
    const payload = await request.json();
    await mongoose.connect(connectionSrt);
    let data = await Fooditem.findOneAndUpdate({ _id: id }, payload);
    return NextResponse.json({ data, success: true });
}