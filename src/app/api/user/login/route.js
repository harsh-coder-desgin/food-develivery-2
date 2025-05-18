import { connectionSrt } from "@/lib/db";
import { Users } from "@/lib/model/users";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const payload = await request.json();

    if (!payload.email || !payload.password) {
      return NextResponse.json({ message: "Email and Password are required", success: false });
    }

    await mongoose.connect(connectionSrt);
    const user = await Users.findOne({ email: payload.email });

    if (!user) {
      return NextResponse.json({ message: "Email not found", success: false });
    }

    if (user.password !== payload.password) {
      return NextResponse.json({ message: "Password does not match", success: false });
    }

    const { password, ...userData } = user.toObject();

    return NextResponse.json({ message: "Login successful", data: userData, success: true });

  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ message: "An error occurred", success: false });
  }
}
