import express from 'express';
import * as controller from '../controllers/transactionController.js';
import * as auth from '../middlewares/auth.js';

const router = express.Router();

// Get all transaction
router.get('/', controller.findAll);

// Get specific transaction by id
router.get('/:id', controller.findById);

// create transaction
router.post('/', controller.create);

export default router;
