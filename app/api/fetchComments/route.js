'use server'
import Comment from '../../../models/comment'
import DBconnect from '../../../libs/mongodb'
import { NextResponse } from 'next/server'

export async function GET (req) {
  try {
    await DBconnect()
    const postId = req.nextUrl.searchParams.get('postId')
    const comments = (await Comment.find({ postId })).reverse()
    const commentIds = comments.map((comment) => comment._id)
    const subComments = await Comment.find({ postId: { $in: commentIds } })
    return NextResponse.json(
      { comments, subComments, message: 'Successfully fetched comments' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error, message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function POST (req) {
  try {
    await DBconnect()
    const { postId } = await req.json()
    const commentNumber = await Comment.countDocuments({ postId })
    return NextResponse.json(
      { commentNumber, message: 'Successfully fetched comment number' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error, message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function DELETE (req) {
  try {
    await DBconnect()
    const { commentId } = await req.json()
    await Promise.all([
      Comment.findByIdAndDelete(commentId),
      Comment.deleteMany({ postId: commentId })
    ])
    return NextResponse.json(
      { message: 'Successfully deleted comment' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error, message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
