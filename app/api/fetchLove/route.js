import DBconnect from "../../../libs/mongodb";
import Loveform from "../../../models/loveform";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await DBconnect();
    const loveforms = (await Loveform.find({})).reverse();
    return NextResponse.json({ loveforms }, { status: 200 });
  } catch (error) {
    console.error("Error fetching loveforms:", error);
    return NextResponse.json(
      { message: "Error fetching loveforms" },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    await DBconnect();
    const { username, nickname, toWho, content, anonymous } = await req.json();
    const loveform = new Loveform({
      username,
      nickname,
      toWho,
      content,
      anonymous,
    });
    await loveform.save();
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Error creating loveform:", error);
    return NextResponse.json(
      { message: "Error creating loveform" },
      { status: 500 },
    );
  }
}
