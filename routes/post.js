const express = require('express')
const router = express.Router()

const postController = require('../controller/posts')

router
  .route('/')
  .get(postController.getAllPost)
  .post(postController.createPost)
  .delete(postController.deleteAllPost)


router
  .route('/:id')
  .patch(postController.updatePost)
  .delete(postController.deletePost)

module.exports = router