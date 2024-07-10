"use server";
import DBconnect from "../../../libs/mongodb";
import Post from "../../../models/post";
import Like from "../../../models/like";
import Comment from "../../../models/comment";
import Likestatus from "../../../models/likestatus";
import { NextResponse } from "next/server";

export async function GET(req) {
  await DBconnect();

  // Get the cursor from the request query parameters
  const cursor = req.nextUrl.searchParams.get("cursor");
  const limit = parseInt(req.nextUrl.searchParams.get("limit")) || 9;

  const query = { group: "general" };

  // If a cursor is provided, modify the query to fetch posts with _id less than the cursor
  if (cursor) {
    query._id = { $lt: cursor };
  }

  const posts = await Post.find(query)
    .sort({ _id: -1 }) // Sort by _id in descending order to get the latest posts first
    .limit(limit);

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
    Like.deleteMany({ postId: { $in: commentIds } }),
    Likestatus.deleteMany({ postId: { $in: commentIds } }),
  ]);

  return NextResponse.json(
    { message: "Post and related comments deleted" },
    { status: 200 },
  );
}
