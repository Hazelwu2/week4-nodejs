// Utils
const { successHandle } = require('../utils/resHandle.js')
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const ApiState = require('../utils/apiState')
// Model
const User = require('../model/user')
// Package
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

// jwt.sign(payload, secret, options)
const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXPIRES_DAY
})

// 產生 Token 並回傳
const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user._id)

  successHandle({
    res,
    data: {
      token,
      user: {
        name: user.name,
        email: user.email,
        _id: user._id
      }
    }
  })
}

// [Post] /signup，註冊
const signup = catchAsync(async (req, res, next) => {
  let { name, email, password, passwordConfirm } = req.body

  if (!name || !email || !password || !passwordConfirm) {
    return next(new AppError(ApiState.FIELD_MISSING))
  }


  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
  })

  createAndSendToken(newUser, 201, res)
})

// [Post] /login，登入
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) return next(new AppError(ApiState.FIELD_MISSING))

  const user = await User.findOne({ email }).select('+password');
  console.log('user', user)

  if (!user || !user.password) return next(new AppError(ApiState.LOGIN_FAIL))

  // 比對密碼是否正確
  const auth = await bcryptjs.compare(password, user?.password);

  if (!auth) return next(new AppError(ApiState.LOGIN_FAIL))

  createAndSendToken(user, 200, res)
})

// [Patch] /updatePassword，更改使用者密碼
const updatePassword = catchAsync(async (req, res, next) => {
  const { password, newPassword } = req.body

  if (password !== confirmPassword) {
    return next(new AppError({ statusCode: 400, message: '密碼不一致' }))
  }

  // 加密
  newPassword = bcryptjs.hash(password, 12)

  const user = await User.findByIdAndUpdate(req.user.id, {
    password: newPassword
  })

  createAndSendToken(user, 200, res)
})

// [Patch] /updatePassword，更改使用者密碼
const updateInfo = catchAsync(async (req, res, next) => {
  successHandle({ res })
})

const isAuth = catchAsync(async (req, res, next) => {
  let token
  const { authorization } = req.headers

  if (authorization && authorization.startsWith('Bearer')) {
    token = authorization.split(' ')[1]
  }
  console.log('token', token)

  if (!token) return next(new AppError(ApiState.NOT_LOGIN))

  // Verify Token
  const decoded = await jwt.verify(token, process.env.JWT_SECRET)
  /*
    decoded { id: '62780ea9649620ec164b66ad', iat: 1652035816, exp: 1652640616 }
  */

  const currentUser = await User.findById(decoded.id)
  req.user = currentUser

  next()
})

const profile = catchAsync(async (req, res, next) => {
  successHandle({ res, data: req.user, data })
})

const updateAvatar = catchAsync(async (req, res, next) => {
  const data = await User.updateMany({ avatar: 'https://i.imgur.com/ebhxV0n.jpeg' })
  successHandle({ res, data: req.user, data })
})

module.exports = {
  signup,
  login,
  updatePassword,
  updateInfo,
  isAuth,
  profile,
  updateAvatar
}