import express from 'express';
import sessionController from '../controllers/sessionController.js';

const router = express.Router();

// Rotas para gerenciar variáveis de sessão
router.post('/session/:userId', sessionController.setSession);
router.get('/session/:userId', sessionController.getSession);

export default router;
