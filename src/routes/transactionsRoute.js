import express from 'express';
import * as controller from '../controllers/transactionController.js';
import * as auth from '../middlewares/auth.js';

const router = express.Router();

// Get all books
router.get('/', controller.findAll);

// Get specific book by id
router.get('/:id', controller.findById);

// Create new book
// router.post('/', 
// auth.authenticate, 
// auth.authorizeAdmin, 
// controller.create);
router.post('/', controller.create);

// Update specific book by id
// router.put(
//   '/:id',
//   auth.authenticate,
//   auth.authorizeAdmin,
//   controller.updateById
// );

export default router;
