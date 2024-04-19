"use server";
import fetch from "node-fetch";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { response_key } = await req.json();
  const secret_key = process.env.RECAPTCHA_SECRET;

  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`;

  try {
    const response = await fetch(url, { method: "post" });
    const google_response = await response.json();

    if (google_response.success == true) {
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
