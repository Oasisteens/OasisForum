"use server";
import { NextResponse } from "next/server.js";
import User from "../../../models/user";
import DBconnect from "../../../libs/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { username, password, email } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await DBconnect();

    const oripw = password;
    await User.create({
      username: username,
      originalPassword: oripw,
      password: hashedPassword,
      email: email,
      admin: false,
    });

    return NextResponse.json({ message: "User Created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    const response = NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
    return response;
  }
}
