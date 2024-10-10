import { NextResponse } from 'next/server'
import { writeFile, unlink } from 'fs/promises'
import User from '../../../models/user'
import DBconnect from '../../../libs/mongodb'
import path from 'path'
import crypto from 'crypto'

export async function POST (req, res) {
  await DBconnect()
  const formData = await req.formData()

  const username = formData.get('username')
  const avatar = formData.get('avatar')

  if (!avatar) {
    return NextResponse.json({ error: 'Avatar is required' }, { status: 400 })
  }

  const user = await User.findOne({ username })
  if (user && user.image) {
    await unlink(path.join(process.cwd(), 'public', 'avatar', user.image))
  }

  const hash = crypto.createHash('sha256')
  hash.update(username)
  const userId = hash.digest('hex')
  const avatarName = `avatar-${userId}${path.extname(avatar.name)}`
  const uploadDir = path.join(process.cwd(), 'public', 'avatar')

  const avatarBuffer = await avatar.arrayBuffer()
  const avatarBufferData = Buffer.from(avatarBuffer)

  await writeFile(
    path.join(uploadDir, `avatar-${userId}${path.extname(avatar.name)}`),
    avatarBufferData
  )

  try {
    if (user) {
      user.image = avatarName
      await user.save()
      return NextResponse.json(
        { avatarUrl: user.image, message: 'User Avatar Uploaded' },
        { status: 201 }
      )
    } else {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
  } catch (error) {
    console.error('Error uploading avatar', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
