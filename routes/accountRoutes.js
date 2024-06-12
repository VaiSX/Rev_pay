import express from 'express';
import { createAccount, deposit, withdraw, getBalance } from '../controllers/accountController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, createAccount);
router.post('/deposit', authMiddleware, deposit);
router.post('/withdraw', authMiddleware, withdraw);
router.get('/balance/:accountId', authMiddleware, getBalance);

export default router;
