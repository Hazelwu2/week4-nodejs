const { Post } = require('../model/posts')
const {
  successHandle,
  errorHandle,
} = require('../utils/resHandle.js')
const ApiState = require('../utils/apiState')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

const getAllPost = catchAsync(async (req, res, next) => {
  const data = await Post.find()
  successHandle({ res, data })
})

const createPost = catchAsync(async (req, res, next) => {
  const { content, name, image, likes } = req.body

  if (!content || !name) return next(new AppError(ApiState.FIELD_MISSING))

  const data = await Post.create({
    content,
    image,
    name,
    likes
  })

  if (data) {
    successHandle({
      res,
      statusCode: 201,
      message: '新增成功',
      data
    })
  }
})

const deleteAllPost = catchAsync(async (req, res, next) => {
  await Post.deleteMany()
  const data = await Post.find({})
  successHandle({ res, data })
})

const deletePost = catchAsync(async (req, res, next) => {
  const _id = req.params.id

  const data = await Post.findByIdAndDelete({ _id: _id })

  if (!data) return next(new AppError(ApiState.DATA_NOT_EXIST))

  successHandle({
    res,
    statusCode: 200,
    message: '刪除成功',
    data
  })
})

const updatePost = catchAsync(async (req, res, next) => {
  const _id = req.params.id

  const { content, name, image, likes } = req.body

  if (!content || !name) return next(new AppError(ApiState.FIELD_MISSING))

  const data = await Post.findByIdAndUpdate(
    { _id },
    { content, image, name, likes }
  )

  if (!data) return next(new AppError(ApiState.DATA_NOT_EXIST))

  const list = await Post.find({ _id })

  if (!list) return next(new AppError(ApiState.DATA_NOT_EXIST))

  successHandle({ res, data: list })

})

module.exports = {
  getAllPost,
  createPost,
  deleteAllPost,
  deletePost,
  updatePost,
}