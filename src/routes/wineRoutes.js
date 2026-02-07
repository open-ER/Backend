const express = require('express')
const router = express.Router()

const { getAllWines, filterWines, searchWines, compareWines, getFilterOptions } = require('../controllers/wineController')

// 전체 조회
/**
 * @swagger
 * /wines:
 *   get:
 *     summary: 전체 와인 조회
 *     description: 전체 와인 목록을 조회하며 page 기준으로 100개씩 반환됩니다.
 *     tags: [Wines]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: 페이지 번호 (기본값 1, 페이지당 100개 반환)
 *         schema:
 *           type: integer
 *           example: 1
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
 *     description: 사용자가 선택한 필터 조건에 맞는 와인 목록을 조회하며 page 기준으로 100개씩 반환됩니다.
 *     tags: [Wines]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               page:
 *                 type: integer
 *                 description: 페이지 번호 (기본값 1, 페이지당 100개 반환)
 *                 example: 1
 *
 *               price_krw_min:
 *                 type: integer
 *                 example: 0
 *               price_krw_max:
 *                 type: integer
 *                 example: 500000
 *
 *               wine_type:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["레드", "화이트"]
 *
 *               country:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["프랑스", "이탈리아"]
 *
 *               vintage:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [2023, 2022]
 *
 *               grape_or_style:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["샤르도네(오크 숙성)"]
 *
 *               tannin_min:
 *                 type: number
 *                 example: 1
 *               tannin_max:
 *                 type: number
 *                 example: 5
 *
 *               sweetness_min:
 *                 type: number
 *                 example: 1
 *               sweetness_max:
 *                 type: number
 *                 example: 5
 *
 *               acidity_min:
 *                 type: number
 *                 example: 1
 *               acidity_max:
 *                 type: number
 *                 example: 5
 *
 *               body_min:
 *                 type: number
 *                 example: 1
 *               body_max:
 *                 type: number
 *                 example: 5
 *
 *               alcohol_min:
 *                 type: number
 *                 example: 0
 *               alcohol_max:
 *                 type: number
 *                 example: 25
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
 *     description: 와인 이름, 국가, 지역, 품종, 향에서 키워드를 검색하며 page 기준으로 100개씩 반환됩니다.
 *     tags: [Wines]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         required: true
 *         description: 검색 키워드 (와인명, 국가, 지역, 품종, 향 등)
 *         schema:
 *           type: string
 *           example: 화이트
 *
 *       - in: query
 *         name: page
 *         required: false
 *         description: 페이지 번호 (기본값 1, 페이지당 100개 반환)
 *         schema:
 *           type: integer
 *           example: 1
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
