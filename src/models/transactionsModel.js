import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: false,
    },
    userPhone: {
      type: String,
      required: false,
    },
    voucherCode: {
      type: String,
      required: false,
    },
    transactionValue: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;