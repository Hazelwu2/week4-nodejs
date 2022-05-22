const express = require('express')
const router = express.Router()
// Controller
const userController = require('../controller/user')
const authController = require('../controller/auth')
// Utils
const { uploadModule } = require('../utils/upload')
const { isAuth } = require('../service/auth.js')

router
  .route('/')
  .get(userController.getAllUser)
  .delete(userController.deleteAllUser)

router
  .route('/profile')
  .get(isAuth, authController.getProfile) // 取得個人資料
  .patch(
    isAuth,
    uploadModule.single('avatar'),
    authController.updateProfile) // 更新個人資料

// 註冊
router.post('/sign_up', authController.signup)
// 登入
router.post('/sign_in', authController.signin)
// 重設密碼
router.patch('/updatePassword',
  isAuth,
  authController.updatePassword)


module.exports = router