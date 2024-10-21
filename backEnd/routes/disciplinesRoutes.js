import express from 'express';
import disciplinesController from '../controllers/disciplinesController.js';

const router = express.Router();

// Rotas para gerenciar grupos
router.get('/getAllDisciplines', disciplinesController.getAllDisciplines);
//router.get('/disciplinesDetails/:disciplinesId', disciplinesController.getAllDisciplinesDetails);
router.post('/createDisciplines', disciplinesController.createDisciplines);

export default router;
