import mongoose from 'mongoose';
import {
  httpBadRequest,
  httpNotFound,
} from '../helpers/httpExceptionBuilder.js';
import { successResponseBuilder } from '../helpers/responseBuilder.js';
import Transaction from '../models/transactionsModel.js';

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

export const create = async (req, res, next) => {
  try {
    const Transaction = new Transaction(req.body);
    const result = await Transaction.save();
    res.status(201).json(successResponseBuilder({ Transaction: result }));
  } catch (err) {
    if (['CastError', 'ValidationError'].includes(err?.name)) {
      next(httpBadRequest(err.message));
    }
    next(err);
  }
};