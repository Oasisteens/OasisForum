'use server'
import DBconnect from '../../../libs/mongodb'
import Post from '../../../models/post'
import Like from '../../../models/like'
import Comment from '../../../models/comment'
import Likestatus from '../../../models/likestatus'
import { NextResponse } from 'next/server'
import { unlink } from 'fs/promises'
import path from 'path'

export async function GET (req) {
  await DBconnect()

  // Get the cursor from the request query parameters
  const cursor = req.nextUrl.searchParams.get('cursor')
  const limit = parseInt(req.nextUrl.searchParams.get('limit')) || 9

  const query = { group: 'general' }

  // If a cursor is provided, modify the query to fetch posts with _id less than the cursor
  if (cursor) {
    query._id = { $lt: cursor }
  }

  const posts = await Post.find(query)
    .sort({ _id: -1 }) // Sort by _id in descending order to get the latest posts first
    .limit(limit)

  return NextResponse.json({ posts }, { status: 200 })
}

export async function DELETE (req) {
  await DBconnect()
  const id = req.nextUrl.searchParams.get('id')

  try {
    const post = await Post.findById(id)

    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 })
    }

    // 查找与给定 postId 相关的评论
    const comments = await Comment.find({ postId: id })

    // 收集评论的 _id
    const commentIds = comments.map((comment) => comment._id)
    commentIds.push(id) // 将给定的 id 添加到数组中

    // 并行删除相关数据
    await Promise.all([
      Like.findOneAndDelete({ postId: id }),
      Likestatus.deleteMany({ postId: id }),
      Comment.deleteMany({ postId: { $in: commentIds } }),
      Like.deleteMany({ postId: { $in: commentIds } }),
      Likestatus.deleteMany({ postId: { $in: commentIds } }),
      post.pictureUrl.map(async (file) => {
        // 删除文件并处理错误
        await unlink(path.join(process.cwd(), 'public', 'uploads', file.filename), function (err) {
          if (err) {
            console.error('Error deleting file from uploads:', err)
          } else {
            console.log('File deleted from uploads!')
          }
        })

        // 删除原始文件
        await unlink(path.join(process.cwd(), 'public', 'oriUploads', file.filename), function (err) {
          if (err) {
            console.error('Error deleting file from oriUploads:', err)
          } else {
            console.log('File deleted from oriUploads!')
          }
        })
      }),
      post.deleteOne()
    ])

    return NextResponse.json(
      { message: 'Post and related comments deleted' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error occurred during deletion:', error)
    return NextResponse.json({ message: 'Error occurred during deletion', error: error.message }, { status: 500 })
  }
}
