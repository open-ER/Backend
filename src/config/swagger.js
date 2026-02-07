const swaggerJsdoc = require('swagger-jsdoc')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Wine API',
      version: '1.0.0',
      description: 'openER API 문서',
    },
    servers: [
      {
        url: process.env.BASE_URL || 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // 라우트 파일 읽어서 문서 생성
}

const specs = swaggerJsdoc(options)

module.exports = specs
