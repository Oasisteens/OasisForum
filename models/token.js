import mongoose from 'mongoose'
const Schema = mongoose.Schema

const tokenSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  resetToken: {
    type: String,
    unique: true,
    length: 20,
    required: true
  },
  createdAt: {
    type: Date,
    expires: 600, // This token will expire in 1 hour
    default: Date.now
  }
})

const Token = mongoose.models.Token || mongoose.model('Token', tokenSchema)
export default Token
