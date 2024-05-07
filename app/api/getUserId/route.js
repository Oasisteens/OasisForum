import { NextResponse } from "next/server";
import DBconnect from "../../../libs/mongodb";
import User from "../../../models/user";

export async function GET(req) {
  const username = req.nextUrl.searchParams.get("username");
  try {
    await DBconnect();
    const user = await User.findOne({ username: username });
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: "404" },
      );
    }
    return NextResponse.json(
      { user, message: "Successfully fetched user" },
      { status: "200" },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching user" },
      { status: "500" },
    );
  }
}
