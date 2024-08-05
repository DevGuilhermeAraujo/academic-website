import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

// Rotas mais específicas devem vir antes das rotas mais genéricas
router.get('/getNextRA', userController.getNextRA); // Nova rota específica
router.get('/getAllUsers', userController.getAllUsers);
router.get('/getUserById/:id', userController.getUserById);
router.post('/createUser', userController.createUser);
router.put('/updateUser/:ra', userController.updateUser);
router.delete('/delete/:ra', userController.deleteUser);

export default router;
