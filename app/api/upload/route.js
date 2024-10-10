import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import DBconnect from '../../../libs/mongodb'
import path from 'path'
import { compressImages } from '../../../components/js/imageCompressor'
import Post from '../../../models/post'
import Like from '../../../models/like'
import crypto from 'crypto'
import { RateLimiterMemory } from 'rate-limiter-flexible'

// 创建速率限制器，使用内存存储
const rateLimiter = new RateLimiterMemory({
  points: 5, // 每个 IP 每 60 秒最多 5 次请求
  duration: 60 // 60 秒
})

export async function POST (req, res) {
  const ip = req.ip ?? '127.0.0.1'

  try {
    // 尝试消耗一个点
    await rateLimiter.consume(ip)
  } catch (rejRes) {
    // 超过限制时返回 429 状态
    return NextResponse.json({ message: 'Rate limit exceeded' }, { status: 429 })
  }

  await DBconnect()
  const formData = await req.formData()

  const fields = ['title', 'content', 'postAnonymous', 'group', 'username', 'files']
  const filenames = []
  const data = Object.fromEntries(
    fields.map((field) => [field, formData.get(field) || '']) // 提供默认值
  )
  const { title, content, postAnonymous, group, username } = data
  const files = formData.getAll('files')

  const uploadDir = path.join(process.cwd(), 'public', 'oriUploads')

  // 并行处理文件上传
  if (files && files.length > 0) { // 确保 files 存在且有文件
    await Promise.all(files.map(async (file) => { // 使用 file 参数
      const fileBuffer = await file.arrayBuffer() // 直接使用 file
      const indBufferData = Buffer.from(fileBuffer)
      const filename = `${title}-${crypto.randomBytes(16).toString('hex').slice(0, 16)}${path.extname(file.name)}`
      const filePath = path.join(uploadDir, filename) // 使用 file
      filenames.push(filename)
      try {
        await writeFile(filePath, indBufferData)
        console.log(`File saved: ${filePath}`) // 添加日志以确认文件保存
      } catch (error) {
        console.error(`File failed to be saved: ${filePath}`, error) // 捕获并记录错误
      }
    }))
  }

  const compressPath = path.join(process.cwd(), 'public', 'uploads')

  const fileNumbers = files ? files.length : 0
  const inputFiles = []
  const post = new Post({
    title,
    content,
    group,
    username,
    postAnonymous: postAnonymous === 'true',
    pictures: fileNumbers,
    pictureUrl: []
  })

  if (files && files.length >= 1) {
    files.forEach(function (file, i) {
      post.pictureUrl.push({
        filename: filenames[i],
        originalname: file.name,
        size: file.size
      })
      inputFiles.push(path.join(uploadDir, filenames[i]))
    })
  }
  compressImages(inputFiles, compressPath)

  await post.save().then(() => {
    Like.create({
      postId: post._id,
      username,
      forum: group,
      category: 'post',
      number: 0,
      postingtime: post.postingtime
    })
  })

  return NextResponse.json({ message: 'Post saved' }, { status: 201 })
}
