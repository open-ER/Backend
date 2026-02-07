const express = require('express')
const router = express.Router()

const { getAllWines, filterWines, searchWines, compareWines, getFilterOptions } = require('../controllers/wineController')

// 전체 조회
/**
 * @swagger
 * /wines:
 *   get:
 *     summary: 전체 와인 조회
 *     description: 필터 없이 와인 목록을 조회합니다 (메인 카탈로그용)
 *     tags: [Wines]
 *     responses:
 *       200:
 *         description: 전체 와인 목록 반환
 */
router.get('/', getAllWines)

// 필터링 옵션 조회
/**
 * @swagger
 * /wines/filter-options:
 *   get:
 *     summary: 필터 선택 옵션 조회
 *     description: 필터 UI에 필요한 선택 가능한 값 목록을 반환
 *     tags: [Wines]
 *     responses:
 *       200:
 *         description: 필터 옵션 반환
 */
router.get('/filter-options', getFilterOptions)

// 필터링 조회
/**
 * @swagger
 * /wines/filter:
 *   post:
 *     summary: 와인 필터 조회
 *     description: 가격, 타입, 국가, 빈티지, 맛 프로필 등 조건으로 와인 필터링
 *     tags: [Wines]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             price_krw_min: 0
 *             price_krw_max: 500000
 *             wine_type: ["레드", "화이트"]
 *             country: ["프랑스", "이탈리아"]
 *             vintage: [2023, 2022]
 *             grape_or_style: ["샤르도네(오크 숙성)"]
 *             tannin_min: 1
 *             tannin_max: 5
 *             sweetness_min: 1
 *             sweetness_max: 5
 *             acidity_min: 1
 *             acidity_max: 5
 *             body_min: 1
 *             body_max: 5
 *             alcohol_min: 0
 *             alcohol_max: 25
 *     responses:
 *       200:
 *         description: 필터된 와인 목록 반환
 */
router.post('/filter', filterWines)

// 검색 조회
/**
 * @swagger
 * /wines/search:
 *   get:
 *     summary: 와인 검색
 *     description: 와인 이름, 국가, 지역, 품종, 향에서 키워드 검색
 *     tags: [Wines]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         required: true
 *         example: 샤르도네
 *     responses:
 *       200:
 *         description: 검색 결과 반환
 */
router.get('/search', searchWines)

// 비교 조회
/**
 * @swagger
 * /wines/compare:
 *   post:
 *     summary: 와인 비교 조회
 *     description: 선택한 와인 ID 목록으로 여러 와인 정보를 조회
 *     tags: [Wines]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             ids:
 *               - "698710a6bf6e180622eb7ca1"
 *               - "698710a6bf6e180622eb7ca2"
 *     responses:
 *       200:
 *         description: 선택된 와인 목록 반환
 */
router.post('/compare', compareWines)

module.exports = router
