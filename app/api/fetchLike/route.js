import Like from "@/models/like";
import Post from "@/models/post";
import Likestatus from "@/models/likestatus";
import DBconnect from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await DBconnect();
    const forum = req.nextUrl.searchParams.get("forum");
    const username = req.nextUrl.searchParams.get("username");
    const [likes, likestatuses] = await Promise.all([
      Like.find({ forum: forum }),
      Likestatus.find({ username: username }),
    ]);
    return NextResponse.json({ likes, likestatuses }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  await DBconnect();
  const { postId, sendUsername, status, category } = await req.json();
  await Promise.all([
    status
      ? Like.findOneAndUpdate(
          { postId: postId },
          { $inc: { number: 1 } },
          { new: true },
        )
      : Like.findOneAndUpdate(
          { postId: postId },
          { $inc: { number: -1 } },
          { new: true },
        ),
    Likestatus.findOneAndUpdate(
      { postId: postId, username: sendUsername, category },
      { $set: { status: status } },
      { upsert: true, new: true },
    ),
  ]);
  const [likestatuses, likes] = await Promise.all([
    Likestatus.find(),
    Like.find(),
  ]);
  return NextResponse.json(
    { message: "like successfully recorded", likestatuses, likes },
    { status: 201 },
  );
}
