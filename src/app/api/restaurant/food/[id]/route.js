import { connectionSrt } from "@/lib/db";
import { Fooditem } from "@/lib/model/foods";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, context) {
    const { id } = await context.params;
    let data = []
    await mongoose.connect(connectionSrt);
    data = await Fooditem.find({ rest_id: id });
    return NextResponse.json({ data, success: true });
}
export async function DELETE(request, context) {
    const { id } = await context.params;
    let data = []
    await mongoose.connect(connectionSrt);
    data = await Fooditem.deleteOne({ _id: id });
    return NextResponse.json({ data, success: true });

}