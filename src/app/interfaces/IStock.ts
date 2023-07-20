import { Document } from 'mongoose';

export interface IStock extends Document {
  name: string;
  symbol: string;
  exchange: string;
}
