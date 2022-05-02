const mongoose = require('mongoose')

const DB = process.env.DB_URL.replace(
  '<PASSWORD>',
  process.env.DB_PASSWORD
)

const localDB = 'mongodb://localhost:27017/post'

const connectDB = async () => {
  try {
    await mongoose.connect(localDB || DB)
    console.log('MongoDB 資料庫連接成功')
  } catch (error) {
    console.log('連接資料庫失敗：', error)
  }
}

module.exports = connectDB