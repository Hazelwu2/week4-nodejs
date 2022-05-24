const axios = require('axios')
const FormData = require('form-data')
const multer = require('multer')

/**
 * 上傳檔案
 * 使用 any 接收一切上傳的文件，都放在 req.files (Array)
 * @date 2022-05-25
 */
const uploadModule = multer({
  // Imgur API 限制檔案最大 10MB
  limit: {
    // 限制最多上傳 2 MB，避免 Heroku RAM 512 MB 爆掉
    fileSize: 2 * 1024 * 1024
  },
  // 限制圖片格式
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|png)$/)) {
      cb(new Error('檔案格式錯誤，僅限上傳 jpg 與 png 格式'))
    }
    cb(null, true)
  }
}).any()

/**
 * 上傳檔案，用指定欄位 key 來驗證 Middleware
 * 保存兩種方式以避免後面 imgur package 掛掉，可用回原本的方式
 * router 設定 uploadModuleAssignField.single('image') 指定欄位 image
 * @date 2022-05-25
 */
const uploadModuleAssignField = multer({
  // Imgur API 限制檔案最大 10MB
  limit: {
    // 限制最多上傳 2 MB，避免 Heroku RAM 512 MB 爆掉
    fileSize: 2 * 1024 * 1024
  },
  // 限制圖片格式
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|png)$/)) {
      cb(new Error('檔案格式錯誤，僅限上傳 jpg 與 png 格式'))
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
  uploadModuleAssignField,
  uploadImage
}