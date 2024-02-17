import DBconnect from "@/libs/mongodb";
import Post from "@/models/post";
import Like from "@/models/like";
import Comment from "@/models/comment";
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

  // Find comments with the given postId
  const comments = await Comment.find({ postId: id });

  // Collect their _id
  const commentIds = comments.map((comment) => comment._id);

  // Add the given id to the array
  commentIds.push(id);

  await Promise.all([
    Post.findByIdAndDelete(id),
    Like.findOneAndDelete({ postId: id }),
    Likestatus.deleteMany({ postId: id }),
    // Delete the comments and subcomments
    Comment.deleteMany({ postId: { $in: commentIds } }),
  ]);

  return NextResponse.json(
    { message: "Post and related comments deleted" },
    { status: 200 },
  );
}
