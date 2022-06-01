const mongoose = require('mongoose')
const DB = process.env.DB_URL.replace(
  '<PASSWORD>',
  process.env.DB_PASSWORD
)

// 開發 dev 環境使用。留著以方便切換，故不刪除
const localDB = 'mongodb://localhost:27017/post'

const connectDB = async () => {
  try {
    await mongoose.connect(DB || localDB, {
      serverSelectionTimeoutMS: 300000
    })
    console.log('MongoDB 資料庫連接成功')
  } catch (error) {
    console.log('連接資料庫失敗：', error)
  }
}

module.exports = connectDB