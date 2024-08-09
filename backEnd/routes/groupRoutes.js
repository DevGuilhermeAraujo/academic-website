import express from 'express';
import groupController from '../controllers/groupController.js';

const router = express.Router();

// Rotas para gerenciar grupos
router.get('/getGroups', groupController.getAllGroups);
//router.get('/group-details/:groupId', groupController.getGroupDetails);
//router.get('/availableGroups/:screenId', groupController.getAvailableGroups);
router.get('/getLinkedGroups/:screenId', groupController.getLinkedGroups);
router.post('/linkGroups', groupController.linkGroups);
router.get('/getGroupsData/:screenId', groupController.getGroupsData);

export default router;
