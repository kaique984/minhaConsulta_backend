const express = require('express');
const router = express.Router();
const consultationsController = require('../controllers/ConsultationsController');
const authMiddleware = require('../routes/auth'); // Middleware de autenticação

// Rota para buscar consultas
router.get('/consultas', authMiddleware, consultationsController.getConsultasPorUsuario);

module.exports = router;
