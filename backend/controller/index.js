const { successHandle } = require('../utils/resHandle.js')
const catchAsync = require('../utils/catchAsync')

const isOptions = catchAsync(async (req, res, next) => {
  successHandle({ res, message: '使用 Options' })
})

module.exports = {
  isOptions
}