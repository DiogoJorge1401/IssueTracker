import mongoose from 'mongoose';
const MONGO_URI = process.env.MONGO_URI as string
mongoose.connect(MONGO_URI).then(r => {
  console.log('Database successfully connected');

})