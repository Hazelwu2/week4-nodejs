// Utils
const { successHandle } = require('../utils/resHandle.js')
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const ApiState = require('../utils/apiState')
// Package
const { ImgurClient } = require('imgur')
const sizeOf = require('image-size')

const uploadImage = catchAsync(async (req, res, next) => {
  // 檢查是否有夾帶檔案
  if (!req.files?.length) return next(new AppError(ApiState.MISS_FILE_FILE))

  const dimensions = sizeOf(req.files[0].buffer)

  // 檢查圖片長寬
  if (dimensions.width !== dimensions.height) {
    return next(new AppError({
      statusCode: 400,
      status: 400,
      message: '圖片長寬需符合 1:1 尺寸'
    }))
  }

  const client = new ImgurClient({
    clientId: process.env.IMGUR_CLIENT_ID,
    clientSecret: process.env.IMGUR_CLIENT_SECRET,
    refreshToken: process.env.IMGUR_REFRESH_TOKEN
  })

  const response = await client.upload({
    image: req.files[0].buffer.toString('base64'),
    type: 'base64',
    album: process.env.IMGUR_ALBUM_ID
  })

  if (!response.success) {
    return next(new AppError({ message: response.data }))
  }

  successHandle({ res, data: response.data.link })
})

module.exports = {
  uploadImage
}