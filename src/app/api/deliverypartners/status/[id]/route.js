import mongoose from "mongoose";
import { connectionSrt } from "@/lib/db";
import { OrderSchema } from "@/lib/model/orders";
import { NextResponse } from "next/server";

export async function GET(request, context) {
    const { id } = await context.params;
    await mongoose.connect(connectionSrt);
    const result = await OrderSchema.findOne({ _id: id })
    return NextResponse.json({ success: true, result })
}

export async function PUT(request, context) {
    const { id } = await context.params;
    let payload = await request.json();

    await mongoose.connect(connectionSrt);
    const result = await OrderSchema.findOneAndUpdate({ _id: id }, { $set: { status: payload.status } }, { new: true }  // Ensures updated document is returned
    );
    return NextResponse.json({ success: true, result })
}