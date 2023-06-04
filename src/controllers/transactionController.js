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

// export const create1 = async (req, res, next) => {
//   try {
//     const transaction = new Transaction(req.body);
//     const result = await transaction.save();
//     res.status(201).json(successResponseBuilder({ transaction: result }));
//   } catch (err) {
//     if (['CastError', 'ValidationError'].includes(err?.name)) {
//       next(httpBadRequest(err.message));
//     }
//     next(err);
//   }
// };

export const create = async (req, res, next) => {
  try {
    // Verify cuppon availibility
    const voucher = await Voucher.findOne({ voucherCode: req.body.voucherCode });
    // if (!voucher) throw httpNotFound('Voucher not found');
    // if (voucher.quantity < 1) throw httpException(409, 'Out of voucher');

    // Verify user is valid
    const user = await User.findOne({ phone: req.body.userPhone });
    // if (!user) throw httpNotFound('User not found');

    const company = await Voucher.findOne({ companyName: req.body.companyName });
    // if (!company) throw httpNotFound('Company not found');

    if (!user){
        const detailTransaction = {
        voucherCode: !voucher ? "invalid voucher code" : req.body.voucherCode,
        userPhone: !user ? "not yet registered HematYuk user": req.body.userPhone,
        transactionValue: req.body.transactionValue, 
      }
      res.status(201).json(successResponseBuilder({ transaction: detailTransaction }));
    }

    else if (!voucher){
      const pointTransaction = Math.round(req.body.transactionValue/1000)
      const resPoint = user.point + pointTransaction
      await User.updateOne(
        { _id: user._id },
        {
          point: resPoint,
        }
      );

      // Add borrow
      const transaction = new Transaction({
        userPhone: req.body.userPhone,
        companyName: req.body.companyName,
        transactionValue: req.body.transactionValue,
      });
      transaction.save();

      const detailTransaction = {
        username: user.username,
        userPhone: user.phone,
        userPoint : resPoint,
        transactionValue: transaction.transactionValue, 
      }

      res.status(201).json(successResponseBuilder({ transaction: detailTransaction }));
    }

    else{
      if (voucher.quantity < 1) throw httpException(409, 'Out of voucher');
      const resQuantity = voucher.quantity - 1
      await Voucher.updateOne(
        { _id: voucher._id },
        {
          quantity: resQuantity,
        }
      );

      const pointTransaction = Math.round(req.body.transactionValue/1000)
      const resPoint = user.point + pointTransaction
      await User.updateOne(
        { _id: user._id },
        {
          point: resPoint,
        }
      );

      // Add borrow
      const transaction = new Transaction({
        voucherCode: req.body.voucherCode,
        userPhone: req.body.userPhone,
        companyName: req.body.companyName,
        transactionValue: req.body.transactionValue,
      });
      transaction.save();

      const detailTransaction = {
        username: user.username,
        userPhone: user.phone,
        userPoint : resPoint,
        voucherCode: voucher.voucherCode,
        voucherQuantity: resQuantity,
        transactionValue: transaction.transactionValue, 
      }

      res.status(201).json(successResponseBuilder({ transaction: detailTransaction }));
    }

    
  } catch (err) {
    if (['CastError', 'ValidationError'].includes(err?.name)) {
      next(httpBadRequest(err.message));
    }
    next(err);
  }
};
