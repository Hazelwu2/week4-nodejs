// Utils
const { successHandle } = require('../utils/resHandle.js')
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const ApiState = require('../utils/apiState')
// Model
const User = require('../model/user')
// Package
const jwt = require('jsonwebtoken');

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
      token
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
  // const { email, password } = req.body

})

// [Patch] /updatePassword，更改使用者密碼
const updatePassword = catchAsync(async (req, res, next) => {

})

// [Patch] /updatePassword，更改使用者密碼
const updateInfo = catchAsync(async (req, res, next) => {

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
  const decoded = await new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET), (err, payload) => {
      if (err) {

      }
    }
  })
})

const profile = catchAsync(async (req, res, next) => {
  successHandle({ res })
})

module.exports = {
  signup,
  login,
  updatePassword,
  updateInfo,
  isAuth,
  profile
}