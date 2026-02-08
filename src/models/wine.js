const mongoose = require('mongoose')

const WineSchema = new mongoose.Schema({
  wine_name: String,
  country: String,
  subregion: String,
  vintage: Number,
  wine_type: String,
  grape_or_style: String,
  alcohol: Number,
  tannin: Number,
  sweetness: Number,
  acidity: Number,
  body: Number,
  aromas: [String],
  price_krw: Number,
})

module.exports = mongoose.model('Wine', WineSchema)
