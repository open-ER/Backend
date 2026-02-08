const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI)
    console.log('✅ MongoDB Connected')
  } catch (err) {
    console.warn('⚠️  MongoDB connection failed - running in mock mode')
    console.warn('Error:', err.message)
    // MongoDB 없이도 서버 실행 계속
  }
}

module.exports = connectDB
