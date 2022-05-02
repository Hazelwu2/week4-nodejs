const { successHandle } = require('../utils/resHandle.js')
const catchAsync = require('../utils/catchAsync')
const { User } = require('../model/user')

const createUser = catchAsync(async (req, res, next) => {
  const { name, email, avatar } = req.body
  const data = await User.create({
    name,
    email,
    avatar
  })
  successHandle({ res, data })
})

module.exports = {
  createUser
}