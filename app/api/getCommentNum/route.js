import { NextResponse } from "next/server";
import DBconnect from "../../../libs/mongodb";
import Comment from "../../../models/comment";

export async function GET(req) {
  try {
    await DBconnect();
    const id = req.nextUrl.searchParams.get("id");
    const commentNum = await Comment.find({ postId: id }).countDocuments();
    return NextResponse.json({ commentNum }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
