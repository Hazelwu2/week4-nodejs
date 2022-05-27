const { Schema, model } = require('mongoose')

const commentSchema = new Schema({
  comment: {
    type: String,
    required: [true, '留言不可空白']
  },

  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: [true, 'user must belong to a post.']
  },

  post: {
    type: Schema.ObjectId,
    ref: 'Post',
    required: [true, 'Comment must belong to a post.']
  },

  // 建立時間，轉為 Timestamp 以方便前端好處理
  createdAt: {
    type: Number,
  },
},
  {
    versionKey: false
  }
)

// 使用到 Find 語法就會被觸發，像 await Comment.find()
commentSchema.pre('/^find/', function (next) {
  this.populate({
    path: 'user',
    select: 'email name id createdAt'
  })
})

const Comment = model('Comment', commentSchema)

module.exports = Comment