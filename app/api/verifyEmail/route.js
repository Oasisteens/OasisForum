import { NextResponse } from "next/server";
import DBconnect from "../../../libs/mongodb";
import User from "../../../models/user";

export async function GET(req) {
  try {
    await DBconnect();
    const email = req.nextUrl.searchParams.get("email");
    const user = await User.findOne(
      { email: email },
      { username: true, email: true, image: true, _id: false },
    );

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user, message: "User found" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
