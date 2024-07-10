"use server";
import DBconnect from "../../../libs/mongodb";
import Post from "../../../models/post";
import { NextResponse } from "next/server";
import Like from "../../../models/like";

export async function POST(req, res) {
  try {
    const { username } = await req.json();
    const likes = [];
    await DBconnect();
    const posts = await Post.find({ username });
    await Promise.all(
      posts.map(async (post) => {
        const like = await Like.findOne({ postId: post._id });
        likes.push(like);
      }),
    );
    return NextResponse.json({ posts, likes }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
