const { Schema, model } = require('mongoose')

const postSchema = new Schema({
  // 內容
  content: {
    type: String,
    required: [true, 'Content 未填寫']
  },
  // 圖片
  image: {
    type: String,
    default: ""
  },
  // 建立時間，轉為 Timestamp 以方便前端好處理
  createdAt: {
    type: Number,
    default: new Date().getTime(),
    select: false
  },
  // 貼文名稱
  name: {
    type: String,
    required: [true, '貼文姓名未填寫']
  },
  // 按讚數
  likes: {
    type: Number,
    default: 0
  }
}, { versionKey: false })

const Post = model('Post', postSchema)

module.exports = {
  Post
}