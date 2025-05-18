import { connectionSrt } from "@/lib/db"
import { Restaurant } from "@/lib/model/restaurant";
import mongoose from "mongoose"
import { NextResponse } from "next/server";

export async function GET() {
  let data = []
  try {
    await mongoose.connect(connectionSrt);
    data = await Restaurant.find();
  } catch (error) {
    data = { success: false }
    console.log(error);
  }
  return NextResponse.json({ result: data, success: true });
}

export async function POST(request) {
  const payload = await request.json();
  if (payload.name && payload.contact && payload.address && payload.city && payload.email && payload.password) {
    await mongoose.connect(connectionSrt);
    let restaurant = new Restaurant(payload);
    const result = await restaurant.save();
    return NextResponse.json({ result, success: true })
  }

  let data = await Restaurant.findOne({ email: payload.email });

  if (payload.email && payload.password) {
    await mongoose.connect(connectionSrt);

    if (!data) {
      return NextResponse.json({ message: 'Email not found', success: false });

    }

    if (data.password !== payload.password) {
      return NextResponse.json({ message: 'Password  not match  found', success: false });
    } else {
      return NextResponse.json({ message: 'Login successful', data, success: true });
    }
  }

}

