const express = require('express');
const app = express();
const consultationsRoute = require('./controllers/ConsultationsRoute');

// Middleware para JSON
app.use(express.json());

// Rotas
app.use('/api', consultationsRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
