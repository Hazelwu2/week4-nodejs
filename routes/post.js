const express = require('express')
const router = express.Router()

const postController = require('../controller/posts')
const multer = require('multer')
const upload = multer({
  fileFilter: (req, file, cb) => {
    // 只接受三種圖片格式
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(new Error('Please upload an image'))
    }
    cb(null, true)
  }
})

router
  .route('/')
  .get(postController.getAllPost)
  .post(upload.single('image'), postController.createPost)
  .delete(postController.deleteAllPost)


router
  .route('/:id')
  .patch(postController.updatePost)
  .delete(postController.deletePost)

module.exports = router