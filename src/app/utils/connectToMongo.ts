import mongoose from 'mongoose';

const uri = process.env.MONGO_URI as string;

export const connectToMongo = async () => {
  try {
    await mongoose.connect(uri);
  } catch (error) {
    console.error(error);
  }
};
