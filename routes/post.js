const express = require('express')
const router = express.Router()
// Controller
const postController = require('../controller/posts')
// Utils
const { uploadModule } = require('../utils/upload')
const { isAuth } = require('../service/auth')

router
  .route('/')
  .get(isAuth, postController.getAllPost)
  .post(isAuth, uploadModule.single('image'), postController.createPost)
  .delete(postController.deleteAllPost)

router
  .route('/:id')
  .get(postController.getSinglePost)
  .patch(postController.updatePost)
  .delete(postController.deletePost)

module.exports = router