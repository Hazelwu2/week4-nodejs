// Utils
const { successHandle } = require('../utils/resHandle.js')
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const ApiState = require('../utils/apiState')
const validator = require('validator')
const { uploadImage } = require('../service/upload')
// Model
const User = require('../model/user')
// Package
const bcryptjs = require('bcryptjs');
const { generatorTokenAndSend, isAuth } = require('../service/auth')

// [Post] users/signup，註冊
const signup = catchAsync(async (req, res, next) => {
  let { name, email, password, passwordConfirm } = req.body

  if (!name || !email || !password || !passwordConfirm) {
    return next(new AppError(ApiState.FIELD_MISSING))
  }

  // 檢查密碼字數
  if (!validator.isLength(password, { min: 8 })) {
    return next(new AppError({ statusCode: 400, message: '密碼字數低於 8 碼' }))
  }

  // 檢查 Email
  if (!validator.isEmail(email)) {
    return next(new AppError({ statusCode: 400, message: 'Email 格式不正確' }))
  }

  // passwordConfirm 在 model/user 驗證
  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
  })

  generatorTokenAndSend(newUser, 201, res)
})

// [Post] users/sign_in，登入
const signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) return next(new AppError(ApiState.FIELD_MISSING))

  const user = await User.findOne({ email }).select('+password');

  if (!user || !user.password) return next(new AppError(ApiState.LOGIN_FAIL))

  // 比對密碼是否正確
  const auth = await bcryptjs.compare(password, user?.password);

  if (!auth) return next(new AppError(ApiState.LOGIN_FAIL))

  generatorTokenAndSend(user, 200, res)
})

// [Patch] /users/updatePassword，重設密碼
const updatePassword = catchAsync(async (req, res, next) => {
  const { password, confirmPassword } = req.body

  // 驗證參數
  if (!password || !confirmPassword) return next(new AppError(ApiState.FIELD_MISSING))

  if (password !== confirmPassword) {
    return next(new AppError({ statusCode: 400, message: '密碼不一致' }))
  }

  // 加密
  newPassword = await bcryptjs.hash(password, 12)

  const user = await User.findByIdAndUpdate(req.user.id, {
    password: newPassword
  })

  generatorTokenAndSend(user, 200, res)
})

// [GET] /users/profile，取得個人資料
const getProfile = catchAsync(async (req, res, next) => {
  successHandle({ res, data: req.user })
})

// [Patch] /users/profile，更新個人資料
// UI: https://xd.adobe.com/view/c0763dbe-fc15-42e8-be0b-8956ed03e675-9525/screen/112f9990-41f0-4c0d-8704-67279a52a49c/
const updateProfile = catchAsync(async (req, res, next) => {

  const { name, sex } = req.body
  if (!name || !sex) return next(new AppError(ApiState.FIELD_MISSING))

  const userData = {}
  userData.name = name
  userData.sex = sex

  if (req.file) {
    const encodeImage = req.file.buffer.toString('base64')
    const { data: imgUrl } = await uploadImage(encodeImage)
    userData.avatar = imgUrl.data.link
  }

  const { _id } = req.user
  const user = await User.findByIdAndUpdate(
    _id,
    userData,
    { runValidators: true, new: true }
  )

  successHandle({
    res,
    message: '修改成功',
    data: user
  })
})


module.exports = {
  signup,
  signin,
  updatePassword,
  updateProfile,
  isAuth,
  getProfile,
}