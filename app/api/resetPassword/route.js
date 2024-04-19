"use server";
import DBconnect from "../../../libs/mongodb";
import { NextResponse } from "next/server";
import User from "../../../models/user";
import bcrypt from "bcryptjs";

export async function PATCH(req, res) {
  try {
    await DBconnect();
    const { username, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate(
      { username: username },
      { originalPassword: password, password: hashedPassword },
    );
    return NextResponse.json({ message: "Password updated" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
