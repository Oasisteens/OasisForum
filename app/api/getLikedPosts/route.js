import Likestatus from "../../../models/likestatus";
import { NextResponse } from "next/server";
import DBconnect from "../../../libs/mongodb";
import Post from "../../../models/post";
import Like from "../../../models/like";

export async function GET(req) {
  await DBconnect();
  const username = req.nextUrl.searchParams.get("username");
  const likestatuses = await Likestatus.find({ username: username });

  const results = await Promise.all(
    likestatuses.map(async (likestatus) => {
      const postPromise = Post.findOne({ _id: likestatus.postId });
      const likePromise = Like.findOne({ postId: likestatus.postId });
      const [post, like] = await Promise.all([postPromise, likePromise]);
      return { post, like };
    }),
  );

  const posts = results.map((result) => result.post);
  const likes = results.map((result) => result.like);

  return NextResponse.json(
    { posts, likes, message: "Successfully fetched liked posts" },
    { status: "200" },
  );
}
