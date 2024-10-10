"use server";
import { NextResponse } from "next/server";
import DBconnect from "../../../libs/mongodb";
import User from "../../../models/user";

export async function POST(req) {
  try {
    const { username } = await req.json();
    await DBconnect();
    const user = await User.findOne({ username }).select("admin");
    return NextResponse.json({ admin: user.admin }, { status: 200 });
  } catch (err) {
    return NextResponse.error({ message: err.message }, { status: 500 });
  }
}
