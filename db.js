const mongoose = require('mongoose')
console.log('process.env.DB_PASSWORD', process.env.DB_PASSWORD)
const DB = process.env.DB_URL.replace(
  '<PASSWORD>',
  process.env.DB_PASSWORD
)

const localDB = 'mongodb://localhost:27017/post'

const connectDB = async () => {
  try {
    await mongoose.connect(DB, {
      serverSelectionTimeoutMS: 300000
    })
    console.log('MongoDB 資料庫連接成功')
  } catch (error) {
    console.log('連接資料庫失敗：', error)
  }
}

module.exports = connectDB