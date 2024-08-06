import express from 'express';
import classController from '../controllers/classController.js';

const router = express.Router();

// Rotas para gerenciamento de turmas
router.get('/getAllClass', classController.getAllClasses);
router.get('/getClassById/:id', classController.getClassById);
router.post('/createClass', classController.createClass);
router.put('/updateClass/:id', classController.updateClass);
router.delete('/deleteClass/:id', classController.deleteClass);

export default router;
