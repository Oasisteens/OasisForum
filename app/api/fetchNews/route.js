import DBconnect from "@/libs/mongodb";
import Post from "@/models/post";
import Like from "@/models/like";
import Likestatus from "@/models/likestatus";
import { NextResponse } from "next/server";

export async function GET() {
  await DBconnect();
  const posts = (await Post.find({ group: "news" })).reverse();
  return NextResponse.json({ posts }, { status: 200 });
}

export async function DELETE(req) {
  const { id } = await req.json();
  await DBconnect();
  Promise.all([
    Post.findByIdAndDelete(id),
    Like.findOneAndDelete({ postId: id }),
    Likestatus.deleteMany({ postId: id }),
  ]);
  return NextResponse.json({ message: "News deleted" }, { status: 200 });
}
