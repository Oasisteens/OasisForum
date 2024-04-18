import User from "../../../models/user";
import DBconnect from "../../../libs/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await DBconnect();
    const resetToken = req.nextUrl.searchParams.get("resetToken");
    const user = await User.findOne({ resetToken: resetToken });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "User found" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    await DBconnect();
    const { resetToken, password } = await req.json();
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
