"use server";
import { NextResponse } from "next/server";
import DBconnect from "../../../libs/mongodb";
import User from "../../../models/user";

export async function GET(req) {
  try {
    const username = req.nextUrl.searchParams.get("username");
    await DBconnect();
    const user = await User.findOne({ username: username });

    if (user) {
      return NextResponse.json({ avatarUrl: user.image }, { status: 200 });
    } else {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error getting avatar", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
