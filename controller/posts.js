const Post = require('../model/posts')
const axios = require('axios')
const FormData = require('form-data');
const {
  successHandle,
} = require('../utils/resHandle.js')
const ApiState = require('../utils/apiState')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError');

/*
  "_id": "6270124640850c16bd444af3",
  "user": {
      "_id": "627011d72b9eee3731a2972c",
      "name": "Hazel",
      "avatar": "http://placeimg.com/640/480"
  },
  "content": "今天要喝Aaron Turner牌的咖啡",
  "image": "http://placeimg.com/640/480",
  "likes": 0
*/
const getAllPost = catchAsync(async (req, res, next) => {
  // 貼文建立時間排序，ASC 正序遞增
  const timeSort = req.query.sort === 'asc' ? 'createdAt' : '-createdAt'
  const q = req.query.q !== undefined
    ? { "content": new RegExp(req.query.q) }
    : {}

  const data = await Post
    .find(q)
    .populate({
      path: 'user',
      select: 'name avatar'
    })
    .sort(timeSort)
  successHandle({ res, data })
})


const uploadImage = async (file) => {
  const formData = new FormData()
  formData.append('image', file)
  formData.append('type', 'base64')

  return axios({
    method: 'POST',
    url: 'https://api.imgur.com/3/upload',
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
    },
    data: formData
  })

}

const createPost = catchAsync(async (req, res, next) => {
  const { content, name, likes } = req.body
  if (!content || !name) return next(new AppError(ApiState.FIELD_MISSING))
  const encodeImage = req.file.buffer.toString('base64')
  const { data: imgUrl } = await uploadImage(encodeImage)

  // 上傳圖片
  // const test = await uploadImage(fs.createReadStream(path.join(__dirname, './sleep.jpg')))
  const data = await Post.create({
    // TODO: 改為動態 user id
    user: '627011d72b9eee3731a2972c',
    content,
    image: imgUrl?.data?.link,
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