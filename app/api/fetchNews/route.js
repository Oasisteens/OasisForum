import DBconnect from "@/libs/mongodb";
import Post from "@/models/post";
import Like from "@/models/like";
import fs from "fs";
import path from "path";
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
  const post = await Post.findById(id);
  if (post && post.pictureUrl && post.pictureUrl.path) {
    try {
      fs.unlink(path.join(__dirname, post.pictureUrl.path));
      fs.unlink(path.join(__dirname, post.pictureUrl.filename));
    } catch (err) {
      console.error(`Failed to delete local image: ${err}`);
    }
  }
  Promise.all([
    Post.findByIdAndDelete(id),
    Like.findOneAndDelete({ postId: id }),
    Likestatus.deleteMany({ postId: id }),
  ]);
  return NextResponse.json({ message: "News deleted" }, { status: 200 });
}
