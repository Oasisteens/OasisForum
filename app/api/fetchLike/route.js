import Like from "../../../models/like";
import Likestatus from "../../../models/likestatus";
import DBconnect from "../../../libs/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await DBconnect();
    const forum = req.nextUrl.searchParams.get("forum");
    const username = req.nextUrl.searchParams.get("username");
    if (forum) {
      const [likes, likestatuses] = await Promise.all([
        Like.find({ forum: forum }),
        Likestatus.find({ username: username }),
      ]);
      return NextResponse.json({ likes, likestatuses }, { status: 200 });
    } else {
      const likestatuses = await Likestatus.find({ username: username });
      return NextResponse.json({ likestatuses }, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  await DBconnect();
  const { postId, sendUsername, status, category, updatedAt } =
    await req.json();
  const like = await Like.findOne({ postId: postId }, "updatedAt");
  const likeJson = like.toJSON();
  if (updatedAt !== likeJson.updatedAt.toISOString()) {
    return NextResponse.json({ message: "Conflicting Error" }, { status: 409 });
  }

  await Promise.all([
    Likestatus.findOneAndUpdate(
      { postId: postId, username: sendUsername, category },
      { $set: { status: status } },
      { upsert: true, new: true },
    ),
    status
      ? Like.findOneAndUpdate(
          { postId: postId },
          { $inc: { number: 1 }, $set: { updatedAt: Date.now() } },
          { new: true },
        )
      : Like.findOneAndUpdate(
          { postId: postId },
          { $inc: { number: -1 }, $set: { updatedAt: Date.now() } },
          { new: true },
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
