const Wine = require('../models/wine')

// 전체 목록 조회
exports.getAllWines = async (req, res) => {
  try {
    const total = await Wine.countDocuments()
    const wines = await Wine.find().limit(100)

    res.json({
      total: total,
      wines: wines,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: '서버 오류' })
  }
}

// 필터링 옵션 목록 조회
exports.getFilterOptions = async (req, res) => {
  try {
    const wineTypes = await Wine.distinct('wine_type')
    const countries = await Wine.distinct('country')
    const vintages = await Wine.distinct('vintage')
    const grapes = await Wine.distinct('grape_or_style')

    res.json({
      wine_type: wineTypes.sort(),
      country: countries.sort(),
      vintage: vintages.sort((a, b) => b - a), // 최신순
      grape_or_style: grapes.sort(),
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: '필터 옵션 조회 실패' })
  }
}

// 필터링 목록 조회
exports.filterWines = async (req, res) => {
  try {
    const { price_krw_min, price_krw_max, wine_type, country, vintage, grape_or_style, tannin_min, tannin_max, sweetness_min, sweetness_max, acidity_min, acidity_max, body_min, body_max, alcohol_min, alcohol_max } = req.body

    const query = {}

    // 가격 범위
    if (price_krw_min !== undefined || price_krw_max !== undefined) {
      query.price_krw = {}
      if (price_krw_min !== undefined) query.price_krw.$gte = price_krw_min
      if (price_krw_max !== undefined) query.price_krw.$lte = price_krw_max
    }

    // 와인 타입 (다중 선택)
    if (wine_type && wine_type.length > 0) {
      query.wine_type = { $in: wine_type }
    }

    // 국가
    if (country && country.length > 0) {
      query.country = { $in: country }
    }

    // 빈티지
    if (vintage && vintage.length > 0) {
      query.vintage = { $in: vintage }
    }

    // 품종
    if (grape_or_style && grape_or_style.length > 0) {
      query.grape_or_style = { $in: grape_or_style }
    }

    // 타닌
    if (tannin_min !== undefined || tannin_max !== undefined) {
      query.tannin = {}
      if (tannin_min !== undefined) query.tannin.$gte = tannin_min
      if (tannin_max !== undefined) query.tannin.$lte = tannin_max
    }

    // 당도
    if (sweetness_min !== undefined || sweetness_max !== undefined) {
      query.sweetness = {}
      if (sweetness_min !== undefined) query.sweetness.$gte = sweetness_min
      if (sweetness_max !== undefined) query.sweetness.$lte = sweetness_max
    }

    // 산도
    if (acidity_min !== undefined || acidity_max !== undefined) {
      query.acidity = {}
      if (acidity_min !== undefined) query.acidity.$gte = acidity_min
      if (acidity_max !== undefined) query.acidity.$lte = acidity_max
    }

    // 바디
    if (body_min !== undefined || body_max !== undefined) {
      query.body = {}
      if (body_min !== undefined) query.body.$gte = body_min
      if (body_max !== undefined) query.body.$lte = body_max
    }

    // 알코올
    if (alcohol_min !== undefined || alcohol_max !== undefined) {
      query.alcohol = {}
      if (alcohol_min !== undefined) query.alcohol.$gte = alcohol_min
      if (alcohol_max !== undefined) query.alcohol.$lte = alcohol_max
    }

    const total = await Wine.countDocuments(query)
    const wines = await Wine.find(query).limit(200)

    res.json({
      total,
      wines,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: '필터링 조회 실패' })
  }
}

// 검색 조회
exports.searchWines = async (req, res) => {
  try {
    const { keyword } = req.query

    // 키워드 없으면 빈 배열 반환
    if (!keyword) {
      return res.json({
        total: 0,
        wines: [],
      })
    }

    const regex = new RegExp(keyword, 'i') // "i" : 대소문자 구분 없이 검색

    const total = await Wine.countDocuments({
      $or: [{ wine_name: regex }, { country: regex }, { subregion: regex }, { grape_or_style: regex }, { aromas: regex }, { wine_type: regex }],
    })

    const wines = await Wine.find({
      $or: [{ wine_name: regex }, { country: regex }, { subregion: regex }, { grape_or_style: regex }, { aromas: regex }, { wine_type: regex }],
    })
      .limit(200)
      .lean()

    res.json({
      total,
      wines,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: '검색 실패' })
  }
}

const mongoose = require('mongoose')

// 와인 비교
exports.compareWines = async (req, res) => {
  try {
    const { ids } = req.body

    if (!ids || ids.length === 0) {
      return res.status(400).json({
        message: '비교할 와인 ID가 필요합니다.',
      })
    }

    // 배열인지 체크
    if (!Array.isArray(ids)) {
      return res.status(400).json({
        message: 'ids는 배열 형태여야 합니다',
      })
    }

    // 최소 2개 최대 5개 선택
    if (ids.length < 2) {
      return res.status(400).json({
        message: '와인은 최소 2개 이상 선택해야 합니다',
      })
    }
    if (ids.length > 5) {
      return res.status(400).json({
        message: '와인은 최대 5개까지만 비교할 수 있습니다',
      })
    }

    // ObjectId 형태로 변환
    const objectIds = ids.map((id) => new mongoose.Types.ObjectId(id))

    const wines = await Wine.find({
      _id: { $in: objectIds },
    }).lean()

    res.json({
      total: wines.length,
      wines,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: '비교 조회 실패' })
  }
}
