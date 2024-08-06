// routes/accessRoutes.js
import express from 'express';
import accessController from '../controllers/accessController.js';

const router = express.Router();

// Rotas para gerenciar permissões
router.get('/screens', accessController.getAllScreens);
router.get('/groups', accessController.getAllGroups);
router.get('/user-permissions/:usuarioId', accessController.getUserPermissions);
router.post('/screen-permissions', accessController.updateScreenPermissions);

export default router;
