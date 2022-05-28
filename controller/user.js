const { successHandle } = require('../utils/resHandle.js')
const catchAsync = require('../utils/catchAsync')
const User = require('../model/user')
const AppError = require('../utils/appError.js')

const getAllUser = catchAsync(async (req, res, next) => {
  const data = await User.find()
  successHandle({ res, data })
})

const deleteAllUser = catchAsync(async (req, res, next) => {
  const data = await User.deleteMany()
  successHandle({ res, data })
})

// [POST] 追蹤朋友 /api/users/:id/follow
const followUser = catchAsync(async (req, res, next) => {
  if (req.params.id === req.user.id) {
    return next(new AppError({ message: '無法追蹤自己', status: 401, statusCode: 401 }))
  }

  await User.updateOne(
    { _id: req.user.id },
    {
      $addToSet: {
        following: {
          user: req.params.id
        }
      }
    }
  )

  // 找到對方使用者的 id
  await User.updateOne(
    { _id: req.params.id },
    {
      $addToSet: {
        followers: {
          user: req.user.id
        }
      }
    }
  )

  successHandle({
    res,
    message: '你已成功追蹤對方'
  })
})

// [DELETE] 取消追蹤朋友 /api/users/:id/unfollow
const unFollowUser = catchAsync(async (req, res, next) => {
  if (req.params.id === req.user.id) {
    return next(new AppError({ message: '你無法取消追蹤自己', status: 401, statusCode: 401 }))
  }

  await User.updateOne(
    { _id: req.user.id },
    {
      $pull: {
        following: {
          user: req.user.id
        }
      }
    }
  )

  await User.updateOne(
    { _id: req.params.id },
    {
      $pull: {
        followers: {
          user: req.user.id
        }
      }
    }
  )
})

module.exports = {
  getAllUser,
  deleteAllUser,
  followUser,
  unFollowUser
}