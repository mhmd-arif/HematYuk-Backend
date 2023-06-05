import express from 'express';
import * as controller from '../controllers/usersController.js';

const router = express.Router();

// get specific user
router.get('/:id', controller.findById);

export default router;
