"use server";
import Token from "../../../models/token";
import DBconnect from "../../../libs/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await DBconnect();
    const resetToken = req.nextUrl.searchParams.get("resetToken");
    const user = await Token.findOne(
      { resetToken: resetToken },
      { _id: 0, username: 1 },
    );
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "User found", username: user.username },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
