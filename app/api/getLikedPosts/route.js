import Likestatus from "@/models/likestatus";
import { NextResponse } from "next/server";
import DBconnect from "@/libs/mongodb";
import Post from "@/models/post";
import Like from "@/models/like";

export async function GET(req) {
  await DBconnect();
  var posts = [];
  var likes = [];
  const username = req.nextUrl.query.username;
  const likestatuses = await Likestatus.find({ username: username });
  await Promise.all(
    likestatuses.map(async (likestatus) => {
      const post = await Post.findOne({ _id: likestatus.postId });
      const like = await Like.findOne({ postId: likestatus.postId });
      posts.push(post);
      likes.push(like);
    }),
  );
  return NextResponse.json({ posts, likes }, { postslikes });
}
