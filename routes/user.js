const express = require('express')
const router = express.Router()
const userController = require('../controller/user')

router.post('/create/', userController.createUser)
router
  .route('/')
  .get(userController.getAllUser)
  .delete(userController.deleteAllUser)

module.exports = router