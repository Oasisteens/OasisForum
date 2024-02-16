import DBconnect from "@/libs/mongodb";
import Post from "@/models/post";
import Like from "@/models/like";
import fs from "fs";
import { promisify } from "util";
const unlinkAsync = promisify(fs.unlink);
import path from "path";
import Likestatus from "@/models/likestatus";
import { NextResponse } from "next/server";

export async function GET() {
  await DBconnect();
  const posts = (await Post.find({ group: "general" })).reverse();
  return NextResponse.json({ posts }, { status: 200 });
}

export async function DELETE(req) {
  const { id } = await req.json();
  await DBconnect();
  // if (post && post.pictureUrl && post.pictureUrl.path) {
  //   try {
  //     await unlinkAsync(path.join(__dirname, post.pictureUrl.filename));
  //     console.log("File deleted successfully");
  //   } catch (err) {
  //     console.error(`Failed to delete local image: ${err}`);
  //   }
  // }
  await Promise.all([
    Post.findByIdAndDelete(id),
    Like.findOneAndDelete({ postId: id }),
    Likestatus.deleteMany({ postId: id }),
  ]);
  return NextResponse.json({ message: "Post deleted" }, { status: 200 });
}
