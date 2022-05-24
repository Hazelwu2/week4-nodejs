const express = require('express')
const router = express.Router()
// Controller
const uploadController = require('../controller/upload')
// Utils
const { uploadModule } = require('../service/upload')
const { isAuth } = require('../service/auth.js')

router
  .route('/')
  .post(isAuth, uploadModule, uploadController.uploadImage)

module.exports = router