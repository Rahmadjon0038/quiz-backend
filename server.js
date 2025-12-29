const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const quizRoutes = require('./routes/quizRoutes');

const app = express();
app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routerlarni ulash
app.use('/api', quizRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server http://localhost:${PORT} da ishladi`);
    console.log(`Swagger: http://localhost:${PORT}/api-docs`);
});