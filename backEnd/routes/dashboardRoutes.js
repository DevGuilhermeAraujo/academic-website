// backEnd/routes/dashboardRoutes.js
import express from 'express';
import dashboardController from '../controllers/dashboardController.js';

const router = express.Router();

router.use('/', dashboardController);

export default router;
