import express from 'express';
import accessController from '../controllers/accessController.js';

const router = express.Router();

// Rotas para gerenciar permissões
router.get('/getScreens', accessController.getScreens);
router.get('/getGroups', accessController.getAllGroups);
router.get('/group-details/:groupId', accessController.getGroupDetails); // Rota para detalhes do grupo
router.post('/screen-permissions', accessController.updateAccess);

// Rotas para gerenciar variáveis de sessão
router.post('/session/:userId', accessController.setSession);
router.get('/session/:userId', accessController.getSession);

// Rotas para vincular grupos às telas
router.get('/availableGroups/:screenId', accessController.getAvailableGroups); // Grupos disponíveis para vinculação
router.get('/getLinkedGroups/:screenId', accessController.getLinkedGroups); // Grupos já vinculados a uma tela
router.post('/linkGroups', accessController.linkGroups); // Vincular grupos à tela
router.get('/groupsData/:screenId', accessController.getGroupsData);

export default router;
