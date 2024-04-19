"use server";
import Like from "../../../models/like";
import DBconnect from "../../../libs/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await DBconnect();
    const commentIds = Array.isArray(req.nextUrl.searchParams.get("commentId"))
      ? req.nextUrl.searchParams.get("commentId")
      : [req.nextUrl.searchParams.get("commentId")];
    const subIds = Array.isArray(req.nextUrl.searchParams.get("subId"))
      ? req.nextUrl.searchParams.get("subId")
      : [req.nextUrl.searchParams.get("subId")];
    const [commentLikes, subCommentLikes] = await Promise.all([
      Like.find({ postId: { $in: commentIds } }),
      Like.find({ postId: { $in: subIds } }),
    ]);
    const likes = commentLikes.concat(subCommentLikes);
    console.log(likes);
    return NextResponse.json({ likes }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
