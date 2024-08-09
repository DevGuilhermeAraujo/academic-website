import express from 'express';
import accessController from '../controllers/accessController.js';

const router = express.Router();

router.post('/screen-permissions', accessController.updateAccess);

export default router;
