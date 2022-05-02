const ApiState = require('../utils/apiState')

const sendErrorDev = (err, res) => {
  // console 顯示錯誤訊息
  console.log(err.stack)

  // Dev 環境會特別顯示 Error 印出詳細錯誤訊息
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
  })

}

const sendErrorProd = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  })
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

  err.statusCode = err.statusCode || customeMessage.statusCode
  err.status = err.status || customeMessage.status
  err.name = err.name
  err.stack = err.stack

  console.log(ApiState.TYPE_ERROR)

  if (err instanceof SyntaxError) setError(ApiState.SYNTAX_ERROR, err, 1)
  if (err instanceof ReferenceError) setError(ApiState.REFERENCE_ERROR, err, 2)
  if (err instanceof TypeError) setError(ApiState.TYPE_ERROR, err, 3)
  else
    err.message = isDev ?
      err.message || customeMessage.message
      : customeMessage.message

  // Dev 環境給詳細 Log
  isDev() && sendErrorDev(err, res)

  // Production 環境給簡易 Log
  isProduction() && sendErrorProd(err, res)
}