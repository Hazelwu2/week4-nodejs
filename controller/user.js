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
    {
      _id: req.user.id,
      'following.user': { $ne: req.params.id }
    },
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
    {
      _id: req.params.id,
      'followers.user': { $ne: req.user.id }
    },
    {
      $addToSet: {
        followers: {
          user: req.user.id
        }
      }
    }
  )

  const user = await User
    .findById({ _id: req.user.id })

  successHandle({
    res,
    message: '你已成功追蹤對方',
    data: user.following
  })
})

// [DELETE] 取消追蹤朋友 /api/users/:id/unfollow
const unFollowUser = catchAsync(async (req, res, next) => {
  console.log(req.user)
  if (req.params.id === req.user.id) {
    return next(new AppError({ message: '你無法取消追蹤自己', status: 401, statusCode: 401 }))
  }

  await User.updateOne(
    {
      _id: req.user.id,
    },
    {
      $pull: {
        following: {
          user: req.params.id
        }
      }
    }
  )

  await User.updateOne(
    {
      _id: req.params.id
    },
    {
      $pull: { followers: { user: req.user.id } }
    }
  )

  const user = await User
    .findById({ _id: req.user.id })

  successHandle({
    res,
    message: '成功取消追蹤對方',
    data: user.followers
  })
})

// [GET] 取得個人追蹤名單 /api/users/following
const getFollowing = catchAsync(async (req, res, next) => {
  const user = await User
    .findById({ _id: req.user.id })
    .select('following followers')

  successHandle({
    res,
    data: user
  })
})

module.exports = {
  getAllUser,
  deleteAllUser,
  followUser,
  unFollowUser,
  getFollowing
}