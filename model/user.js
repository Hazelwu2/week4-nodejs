const { Schema, model } = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs');


const userSchema = new Schema({
  name: {
    type: String,
    required: [true, '名字為必填']
  },
  email: {
    type: String,
    required: [true, 'Email為必填'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, '無效Email，請提供 Email 正確格式']
  },
  avatar: String,

  sex: {
    type: String,
    enum: ["male", "female"]
  },

  // 建立時間，轉為 Timestamp 以方便前端好處理
  createdAt: {
    type: Number,
  },

  // 更新時間，轉為 Timestamp 以方便前端好處理
  updatedAt: {
    type: Number,
  },

  password: {
    type: String,
    required: [true, '密碼為必填'],
    trim: true,
    minlength: 8,
    select: false
  },

  passwordConfirm: {
    type: String,
    required: [true, '請重新輸入你的密碼'],
    validate: {
      validator(el) {
        return el === this.password
      },
      message: '必須和密碼欄位相同'
    }
  }


}, {
  versionKey: false,
  timestamps: {
    currentTime: () => Date.now(),
  },
})

userSchema.pre('save', async function (next) {
  // 加密密碼
  this.password = await bcrypt.hash(this.password, 12)

  this.passwordConfirm = undefined
  next()
})

const User = model('User', userSchema)
module.exports = User