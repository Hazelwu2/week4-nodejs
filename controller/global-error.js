const ApiState = require('../utils/apiState')
const AppError = require('../utils/appError')

// 處理 Cast Error
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`
  return new AppError({ message })
}

const sendErrorDev = (err, res) => {
  // console 顯示錯誤訊息
  console.log(err.stack)

  // Dev 環境會特別顯示 Error 印出詳細錯誤訊息
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err.customError || err,
  })

}

const sendErrorProd = (err = ApiState.INTERNAL_SERVER_ERROR, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  })
}

// DB 欄位驗證
const handleValidationErrorDB = (err) => {
  if (err && Object.keys(err.errors).length > 0) {
    err.customError = {}
    Object.keys(err.errors).forEach(item => {
      err.customError[item] = err.errors[item].message
    })
  }
  setError(ApiState.FIELD_MISSING, err)
}

// DB 欄位重複
const handleDuplidateFieldDB = (err) => {
  console.log(err.keyValue)
  if (err && err.keyValue) {
    err.customError = {}
    Object.keys(err.keyValue).forEach(item => {
      err.customError[item] = err.keyValue[item]
    })
  }
  setError(ApiState.DUPLIDATE_FIELD, err)
}

const isDev = () => (process.env.NODE_ENV === 'development')
const isProduction = () => (process.env.NODE_ENV === 'production')
const setError = (customError, err, t) => {
  console.log('t', t)
  err.message = customError.message
  err.status = customError.status
  err.statusCode = customError.statusCode
}

// 捕捉到錯誤
module.exports = (err, req, res, next) => {
  let customeMessage = ApiState.INTERNAL_SERVER_ERROR

  Object.entries(err).forEach(item => {
    console.log(item[0], item[1])
  })

  err.statusCode = err.statusCode || customeMessage.statusCode
  err.status = err.status || customeMessage.status
  err.name = err.name
  err.stack = err.stack

  if (err instanceof SyntaxError) setError(ApiState.SYNTAX_ERROR, err, 1)
  if (err instanceof ReferenceError) setError(ApiState.REFERENCE_ERROR, err, 2)
  if (err instanceof TypeError) setError(ApiState.TYPE_ERROR, err, 3)
  if (err.code === 11000) handleDuplidateFieldDB(err)
  if (err.name === 'CastError') handleCastErrorDB(err)
  if (err.name === 'ValidationError') handleValidationErrorDB(err)
  else
    err.message = isDev ?
      err.message || customeMessage.message
      : customeMessage.message

  // Dev 環境給詳細 Log
  isDev() && sendErrorDev(err, res)

  // Production 環境給簡易 Log
  isProduction() && sendErrorProd(err, res)
}