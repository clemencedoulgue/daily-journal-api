
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import "dotenv/config";
import journalRouter from './routes/entries.js';
import authRouter from './routes/auth.js';
// import User from './models/User.js';

dotenv.config();

//Create an express app
const app = express();

//Establishing connection with database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err))



//Global middlewares
app.use(cors());
app.use(express.json());

app.use('/api/entries', journalRouter)
app.use('/api/auth', authRouter)

  // Start the server
  const PORT = process.env.PORT || 7000
  app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));



