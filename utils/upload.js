const axios = require('axios')
const FormData = require('form-data');
const multer = require('multer')

const uploadModule = multer({
  // Imgur API 限制檔案最大 10MB
  limit: {
    fileSize: 10000000
  },
  // 只接受三種圖片格式
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(new Error('Please upload an image'))
    }
    cb(null, true)
  }
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

module.exports = {
  uploadModule,
  uploadImage
}