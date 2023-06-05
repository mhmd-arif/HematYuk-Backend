import express from 'express';
import * as controller from '../controllers/authController.js';
import * as auth from '../middlewares/auth.js';

const router = express.Router();

// signup user
router.post('/signup', controller.signup);

// signup admin
router.post( '/signup/admin', controller.signupAdmin);

// signin 
router.post('/signin', controller.signin);

export default router;
