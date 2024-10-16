"use server";
import fetch from "node-fetch";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { responseKey } = await req.json();
  const secretKey = process.env.RECAPTCHA_SECRET;

  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${responseKey}`;

  try {
    const response = await fetch(url, { method: "post" });
    const googleResponse = await response.json();

    if (googleResponse.success === true) {
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json({ success: false }, { status: 200 });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
