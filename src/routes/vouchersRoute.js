import express from 'express';
import * as controller from '../controllers/vouchersController.js';
import * as auth from '../middlewares/auth.js';

const router = express.Router();

// Get all vouchers
router.get('/', controller.findAll);

// Get specific voucher by id
router.get('/:id', controller.findById);

// apply voucher
router.get('/apply/:voucherCode', controller.applyVoucher);

// create voucher
router.post('/', auth.authenticate, auth.authorizeAdmin, controller.create);

// update voucher
router.put('/:id', auth.authenticate, auth.authorizeAdmin, controller.updateById);

// delete voucher
router.delete('/:id', auth.authenticate, auth.authorizeAdmin, controller.deleteById);

export default router;
