import express from 'express';
import * as controller from '../controllers/vouchersController.js';
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
router.put('/:id', controller.updateById);

// Delete specific book by id
// router.delete(
//   '/:id',
//   auth.authenticate,
//   auth.authorizeAdmin,
//   controller.deleteById
// );
router.delete('/:id',controller.deleteById);

export default router;
