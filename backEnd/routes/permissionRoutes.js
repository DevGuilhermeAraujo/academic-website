import express from 'express';
import permissionController from '../controllers/permissionController.js';

const router = express.Router();

// Rotas para gerenciar permissões
router.get('/getScreens', permissionController.getScreens);

export default router;
