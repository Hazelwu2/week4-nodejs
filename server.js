const app = require('./app')
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const connectDB = require('./db.js')
const PORT = process.env.PORT || 3005

// 連接資料庫
connectDB()

app.listen(PORT, () => {
  console.log(`Server is runnging at http://locahost:${PORT}`)
})

// Uncaught Excaption
process.on('uncaughtException', err => {
  console.log(err.name, err.message)
  console.log('捕捉到錯誤 Uncaught Exception! Shutting down...')
  process.exit(1)
})

// 未捕捉到的 Catch
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLER REJECTION! Shutting down...')
  console.log(err)
  server.close(() => {
    process.exit(1)
  })
})
