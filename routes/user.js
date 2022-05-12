const express = require('express')
const router = express.Router()
const userController = require('../controller/user')
const authController = require('../controller/auth')

router.post('/create/', userController.createUser)
router
  .route('/')
  .get(userController.getAllUser)
  .delete(userController.deleteAllUser)

router.get('/profile', authController.isAuth, authController.profile)
// 測試使用
router.patch('/update-avatar', authController.updateAvatar)
// 註冊
router.post('/signup', authController.signup)
// 登入
router.post('/login', authController.login)
// 更改使用者密碼
router.patch('/updateMyPassword', authController.updatePassword)
// 更改使用者資料
router.post('/updateInfo', authController.isAuth, authController.updateInfo)


module.exports = router