import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['USER', 'ADMIN'],
      default: 'USER',
    },
    point: {
      type: Number,
      required: false,
      default: 0,
    },
    phone: {
      type: String,
      required: true,
      default: 0, 
    }
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
