'use server'
import DBconnect from '../../../libs/mongodb'
import Post from '../../../models/post'
import Like from '../../../models/like'
import Likestatus from '../../../models/likestatus'
import { NextResponse } from 'next/server'

export async function GET (req) {
  await DBconnect()
  const id = req.nextUrl.searchParams.get('id')
  const [post, like, likestatus] = await Promise.all([
    Post.findById(id),
    Like.findOne({ postId: id }),
    Likestatus.findOne({ postId: id })
  ])
  if (!post) {
    return NextResponse.json({ message: 'Post not found' }, { status: 404 })
  }
  return NextResponse.json({ post, like, likestatus }, { status: 200 })
}
