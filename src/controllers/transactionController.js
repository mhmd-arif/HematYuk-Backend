import mongoose from 'mongoose';
import {
  httpBadRequest,
  httpNotFound,
} from '../helpers/httpExceptionBuilder.js';
import { successResponseBuilder } from '../helpers/responseBuilder.js';
import Transaction from '../models/transactionsModel.js';
import User from '../models/usersModel.js';
import Voucher from '../models/vouchersModel.js';

export const findAll = async (req, res, next) => {
  try {
    const transaction = await Transaction.find({});
    res.json(successResponseBuilder({ transaction: transaction }));
  } catch (err) {
    next(err);
  }
};

export const findById = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const Transaction = await Transaction.findById({ _id: id }).exec();
    if (!Transaction) throw httpNotFound();
    res.json(successResponseBuilder({ Transaction: Transaction }));
  } catch (err) {
    next(err);
  }
};

export const create1 = async (req, res, next) => {
  try {
    const transaction = new Transaction(req.body);
    const result = await transaction.save();
    res.status(201).json(successResponseBuilder({ transaction: result }));
  } catch (err) {
    if (['CastError', 'ValidationError'].includes(err?.name)) {
      next(httpBadRequest(err.message));
    }
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    // Verify cuppon availibility
    const voucher = await Voucher.findOne({ voucherCode: req.body.voucherCode });
    if (Array.isArray(voucher) && voucher.length === 0)
      throw httpNotFound('Voucher not found')
    if (voucher.quantity < 1) {
      throw httpException(409, 'Out of voucher');
    }

    // Verify user is valid
    const user = await User.findOne({ email: req.body.userEmail });
    if (!user) throw httpNotFound('User not found');

    // Add borrwerId and -1 numOfAvailableBooks
    await Voucher.updateOne(
      { _id: voucher._id },
      {
        quantity: voucher.quantity - 1,
      }
    );

    // Add borrow
    const transaction = new Transaction({
      voucherCode: req.body.voucherCode,
      userEmail: req.body.userEmail,
      companyName: req.body.companyName,
      transactionValue: req.body.transactionValue,
    });
    const transactionResult = await transaction.save();

    res.status(201).json(successResponseBuilder({ transaction: transactionResult }));
  } catch (err) {
    if (['CastError', 'ValidationError'].includes(err?.name)) {
      next(httpBadRequest(err.message));
    }
    next(err);
  }
};
