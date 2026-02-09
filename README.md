# 🍷 openER Backend

와인 검색 및 비교 플랫폼 **openER**의 백엔드 서버입니다.  
Node.js + Express + MongoDB 기반으로 와인 데이터 조회, 필터링, 검색, 비교 기능을 제공합니다.


## 🔗 Deploy

- API Server 
```
https://opener-api.onrender.com/
```
- Swagger API Docs  
```
https://opener-api.onrender.com/api-docs/
```

## 🛠 Tech Stack

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Swagger (swagger-jsdoc, swagger-ui)
- Render (배포)


## 📁 프로젝트 구조
```
Backend/
 ├─ src/
 │   ├─ config/
 │   │   └─ db.js
 │   ├─ controllers/
 │   ├─ models/
 │   ├─ routes/
 │   └─ app.js
 │
 ├─ data/
 ├─ package.json
 └─ README.md
```

## 🚀 실행 방법 (로컬)

### 1️⃣ 패키지 설치

```bash
npm install
```
### 2️⃣ .env 파일 생성
```bash
MONGO_URI=your_mongodb_connection_string
PORT=3000
```
### 3️⃣ 서버 실행
```bash
npm start
```
또는
```bash
node src/app.js
```
## 📦 주요 기능

### 1️⃣ 전체 와인 조회
- 메인 카탈로그용 데이터 조회
- 페이지네이션 적용(100개씩 로딩)
- 더보기 버튼과 연동
```code
GET /api/wines?page=1
```
### 2️⃣ 와인 필터링 조회

사용자가 선택한 조건에 맞는 와인만 반환합니다.

지원 필터: 
- 가격 범위
- 와인 타입
- 국가
- 빈티지
- 품종
- 타닌 / 당도 / 산도 / 바디 / 알코올 도수
```code
POST /api/wines/filter
```
### 3️⃣ 와인 검색

키워드 기반 부분 일치 검색

검색 대상:
- 와인 이름
- 국가
- 지역
- 품종
- 향

```code
GET /api/wines/search?keyword=화이트&page=1
```
### 4️⃣ 와인 비교
선택한 와인 2~5개의 상세 정보 조회
```code
POST /api/wines/compare
```
### 5️⃣ 필터 옵션 조회

필터 UI에 필요한 선택 값 제공

```code
GET /api/wines/filter-options
```
## 📊 데이터 구조

CSV 기반 더미 데이터를 MongoDB에 저장하여 사용합니다.

주요 필드:

- wine_name
- country
- subregion
- vintage
- wine_type
- grape_or_style
- alcohol
- tannin
- acidity
- body
- aromas
- price_krw

## 🧠 구현 포인트 

✔ 동적 필터 쿼리 설계
- 다중 선택 필터 지원
- 범위 검색 ($gte, $lte) 적용
- 조건 조합 기반 MongoDB Query 생성

✔ 페이지네이션 최적화
- skip + limit 기반 100개 단위 조회
- countDocuments로 total 제공
- 프론트의 “더보기” UX와 연동

✔ 실시간 검색 API
- regex 기반 부분 일치 검색
- 다중 필드 동시 검색

✔ 구조 분리
- controller / route / model 분리
- 유지보수 가능한 구조 설계

✔ 외부 배포
- MongoDB Atlas 사용
- Render 배포로 외부 접근 가능
