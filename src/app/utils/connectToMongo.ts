import mongoose from 'mongoose';

const uri = process.env.MONGO_URI as string;

export const connectToMongo = async () => {
  try {
    await mongoose.connect(uri);
    console.log('connected to db');
  } catch (error) {
    console.log(error);
  }
};
