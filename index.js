import process from 'process';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import getenv from './src/helpers/getenv.js';
import errorHandler from './src/middlewares/errorHandler.js';

import vouchersRouter from "./src/routes/vouchersRoute.js";
import usersRouter from "./src/routes/usersRoute.js";

const app = express();

const PORT = process.env.PORT;
const MONGO_URI = getenv('MONGO_URI');

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to mongodb'))
  .catch((err) => {
    console.error(`Can't connect to mongodb`);
    console.error(err);
    process.exit(1);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('halo');
});

// app.use('/auth', authRouter);
app.use('/vouchers', vouchersRouter);
// app.use('/borrows', borrowsRouter);
app.use('/users', usersRouter);

app.use(errorHandler);

app.listen(PORT, () => console.info(`Server running on ${PORT}`));
