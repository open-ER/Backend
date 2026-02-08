require('dotenv').config()
const mongoose = require('mongoose')
const csv = require('csvtojson')
const Wine = require('../models/wine')

const MONGO_URI = process.env.DB_URI

const importData = async () => {
  try {
    // 1. MongoDB 연결
    await mongoose.connect(MONGO_URI)
    console.log('(Data) MongoDB Connected')

    // 2. CSV → JSON 변환
    const wines = await csv().fromFile('data/wine_dataset_10000_ko_named.csv')

    // 3. aromas 문자열을 배열로 변환
    const formatted = wines.map((wine) => ({
      ...wine,
      vintage: wine.vintage ? Number(wine.vintage) : null,
      alcohol: wine.alcohol ? Number(wine.alcohol) : null,
      tannin: wine.tannin ? Number(wine.tannin) : null,
      sweetness: wine.sweetness ? Number(wine.sweetness) : null,
      acidity: wine.acidity ? Number(wine.acidity) : null,
      body: wine.body ? Number(wine.body) : null,
      price_krw: wine.price_krw ? Number(wine.price_krw) : null,
      aromas: wine.aromas ? wine.aromas.split(';') : [],
    }))

    // 4. 기존 데이터 삭제 (선택)
    await Wine.deleteMany()

    // 5. MongoDB에 저장
    await Wine.insertMany(formatted)

    console.log('(Data) CSV Data Imported!')
    process.exit()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

importData()
