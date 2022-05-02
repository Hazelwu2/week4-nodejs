const express = require('express')
const router = express.Router()
const indexController = require('../controller/index')

router
  .route('/')
  .options(indexController.isOptions)

module.exports = router