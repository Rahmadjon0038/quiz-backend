const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Quiz API',
            version: '1.0.0',
            description: 'Oddiy Quiz tizimi API hujjatlari',
        },
    },
    apis: ['./routes/*.js'], // Routerlar ichidagi commentlarni o'qiydi
};

module.exports = swaggerJsdoc(options);