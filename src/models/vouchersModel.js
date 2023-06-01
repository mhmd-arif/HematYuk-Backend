import mongoose from 'mongoose';

const voucherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    maxValue: {
      type: Number,
      required: false,
    },
    minTransaction: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: false,
    },
    quantity: {
      type: Number,
      required: false,
    },
    voucherCode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Voucher = mongoose.model('Voucher', voucherSchema);

export default Voucher;