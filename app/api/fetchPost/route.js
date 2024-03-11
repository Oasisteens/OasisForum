import DBconnect from "../../../libs/mongodb";
import Post from "../../../models/post";
import Like from "../../../models/like";
import Comment from "../../../models/comment";
import Likestatus from "../../../models/likestatus";
import { NextResponse } from "next/server";

export async function GET(req) {
  await DBconnect();
  const id = req.nextUrl.searchParams.get("id");
  const post = await Post.findById(id);
  return NextResponse.json({ post }, { status: 200 });
}

export async function DELETE(req) {
  await DBconnect();
  const id = req.nextUrl.searchParams.get("id");
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
    Like.deleteMany({ postId: { $in: commentIds } }),
    Likestatus.deleteMany({ postId: { $in: commentIds } }),
  ]);

  return NextResponse.json(
    { message: "Post and related comments deleted" },
    { status: 200 },
  );
}
