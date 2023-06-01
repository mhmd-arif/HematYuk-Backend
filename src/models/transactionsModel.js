import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    voucherCode: {
      type: String,
      required: false,
    },
    transactionValue: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;