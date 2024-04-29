"use server";
import { NextResponse } from "next/server.js";
import User from "../../../models/user";
import DBconnect from "../../../libs/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { username, password, email } = await req.json();
    if (!/^[^\W_]+$/.test(username)) {
      return NextResponse.json({ error: "Invalid Username" }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid Email" }, { status: 400 });
    }

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
