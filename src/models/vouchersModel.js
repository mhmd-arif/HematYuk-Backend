import mongoose from 'mongoose';

const voucherSchema = new mongoose.Schema(
  {
    name: {
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
    price: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

const Voucher = mongoose.model('User', voucherSchema);

export default Voucher;