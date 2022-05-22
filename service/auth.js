// Utils
const catchAsync = require('../utils/catchAsync')
// Model
const User = require('../model/user')
// Package
const jwt = require('jsonwebtoken')
const { successHandle } = require('../utils/resHandle')
const AppError = require('../utils/appError')
const apiState = require('../utils/apiState')

// jwt.sign(payload, secret, options)
const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXPIRES_DAY
})

// 產生 Token 並回傳
const generatorTokenAndSend = (user, statusCode, res) => {
  const token = signToken(user._id)
  user.password = undefined

  successHandle({
    res,
    data: {
      token,
      user: {
        name: user.name,
        email: user.email,
      }
    }
  })
}

// 驗證 Token
const isAuth = catchAsync(async (req, res, next) => {
  let token
  const { authorization } = req.headers

  // Check Token exist
  if (authorization && authorization.startsWith('Bearer')) {
    token = authorization.split(' ')[1]
  }

  if (!token) return next(new AppError(apiState.NOT_LOGIN))

  // Verify Token
  const decoded = await jwt.verify(authorization, process.env.JWT_SECRET)

  const currentUser = await User.findById(decoded.id)
  req.user = currentUser

  next()
})


module.exports = {
  signToken,
  generatorTokenAndSend,
  isAuth,
}