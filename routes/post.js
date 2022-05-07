const express = require('express')
const router = express.Router()
// Controller
const postController = require('../controller/posts')
// Utils
const { uploadModule } = require('../utils/upload')

router
  .route('/')
  .get(postController.getAllPost)
  .post(uploadModule.single('image'), postController.createPost)
  .delete(postController.deleteAllPost)

router
  .route('/:id')
  .patch(postController.updatePost)
  .delete(postController.deletePost)

module.exports = router