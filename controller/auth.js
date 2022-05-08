const { successHandle } = require('../utils/resHandle.js')
const catchAsync = require('../utils/catchAsync');

// [Post] /signup，註冊
const signup = catchAsync(async (req, rex, next) => {

})

// [Post] /login，登入
const login = catchAsync(async (req, rex, next) => {

})

// [Patch] /updatePassword，更改使用者密碼
const updatePassword = catchAsync(async (req, rex, next) => {

})

// [Patch] /updatePassword，更改使用者密碼
const updateInfo = catchAsync(async (req, rex, next) => {

})

module.exports = {
  signup,
  login,
  updatePassword,
  updateInfo
}