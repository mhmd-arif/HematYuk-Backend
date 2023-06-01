import mongoose from 'mongoose';
import {
  httpBadRequest,
  httpNotFound,
} from '../helpers/httpExceptionBuilder.js';
import { successResponseBuilder } from '../helpers/responseBuilder.js';
import Voucher from '../models/vouchersModel.js';

export const findAll = async (req, res, next) => {
  try {
    const vouchers = await Voucher.find({});
    res.json(successResponseBuilder({ vouchers: vouchers }));
  } catch (err) {
    next(err);
  }
};

export const findById = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const voucher = await Voucher.findById({ _id: id }).exec();
    if (!voucher) throw httpNotFound();
    res.json(successResponseBuilder({ voucher: voucher }));
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const voucher = new Voucher(req.body);
    const result = await voucher.save();
    res.status(201).json(successResponseBuilder({ voucher: result }));
  } catch (err) {
    if (['CastError', 'ValidationError'].includes(err?.name)) {
      next(httpBadRequest(err.message));
    }
    next(err);
  }
};

export const updateById = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const voucher = await Voucher.findOneAndUpdate({ _id: id }, req.body);
    if (!voucher) throw httpNotFound();

    res.json(successResponseBuilder({ voucher: voucher }));
  } catch (err) {
    next(err);
  }
};

export const deleteById = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);

    const voucher = await Voucher.findOneAndDelete({ _id: id });
    if (!voucher) throw httpNotFound();

    res.json(successResponseBuilder({ deletedVoucherkId: id }));
  } catch (err) {
    next(err);
  }
};

export const applyVoucher = async (req, res, next) => {
  try {
    const voucher = await Voucher.findOne({ voucherCode: req.params.voucherCode });
    if (!voucher) throw httpNotFound('Voucher not found');
    if (voucher.quantity < 1) throw httpException(409, 'Out of voucher');
    res.json(successResponseBuilder({ voucher: voucher }));
  } catch (err) {
    next(err);
  }
};