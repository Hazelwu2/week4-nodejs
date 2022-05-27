const express = require('express')
const router = express.Router()
// Controller
const postController = require('../controller/posts')
// Utils
const { uploadModuleAssignField } = require('../service/upload')
const { isAuth } = require('../service/auth')

// 取得按讚列表
router
  .get('/getLikeList', isAuth, postController.getLikeList)

router
  .route('/')
  .get(isAuth, postController.getAllPost)
  .post(isAuth, uploadModuleAssignField.single('image'), postController.createPost)
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

router
  // 取得個人貼文列表
  .get('/user/:id', isAuth, postController.getMyPost)
  // 新增一則貼文的留言
  .post('/:id/comment', isAuth, postController.createComment)



module.exports = router