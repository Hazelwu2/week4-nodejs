const { Schema, model } = require('mongoose')

const postSchema = new Schema({

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
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

  comments: Number
}, { versionKey: false, timestamps: true })

const Post = model('Post', postSchema)

module.exports = Post