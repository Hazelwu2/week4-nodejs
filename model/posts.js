const { Schema, model } = require('mongoose')

const postSchema = new Schema({

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'user 為必填欄位']
  },

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

  // 按讚數
  likes: {
    type: Number,
    default: 0
  },

  // 建立時間，轉為 Timestamp 以方便前端好處理
  createdAt: {
    type: Number,
  },

  // 更新時間，轉為 Timestamp 以方便前端好處理
  updatedAt: {
    type: Number,
  },

  comments: Number
}, { versionKey: false, timestamps: true })

const Post = model('Post', postSchema)

module.exports = Post