const app = require('./app')
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const connectDB = require('./db.js')
const PORT = process.env.PORT || 3005

// 連接資料庫
connectDB()

app.listen(PORT, () => {
  console.log(`Server is runnging at locahost:${PORT}`)
})