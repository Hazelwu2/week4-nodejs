const { successHandle } = require('../utils/resHandle.js')
const catchAsync = require('../utils/catchAsync')
const User = require('../model/user')

const getAllUser = catchAsync(async (req, res, next) => {
  const data = await User.find()
  successHandle({ res, data })
})

const deleteAllUser = catchAsync(async (req, res, next) => {
  const data = await User.deleteMany()
  successHandle({ res, data })
})

module.exports = {
  getAllUser,
  deleteAllUser
}