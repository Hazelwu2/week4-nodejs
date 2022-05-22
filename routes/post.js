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

router
  .route('/:id/likes')
  .post(isAuth, postController.likeSinglePost) // 單篇貼文按讚
  .delete(isAuth, postController.noLikeSinglePost) // 單篇貼文取消讚

// 取得個人貼文列表
router.get('/user/:id', isAuth, postController.getMyPost)


module.exports = router