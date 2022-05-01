const express = require('express')
const morgan = require('morgan')
const app = express()
const { errorHandle } = require('./utils/resHandle')
const ApiState = require('./utils/apiState')
const cors = require('cors')
// Router
const postRouter = require('./routes/post')
const indexRouter = require('./routes/index')
// Controller
const globalErrorHandler = require('./controller/global-error')
const AppError = require('./utils/appError')

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

// Router
app.use('/', indexRouter)
app.use('/posts', postRouter)

// 無此路由
app.use('*', (req, res, next) => {
  next(new AppError(ApiState.ROUTER_NOT_FOUND))
})

// 處理錯誤
app.use(globalErrorHandler)

module.exports = app