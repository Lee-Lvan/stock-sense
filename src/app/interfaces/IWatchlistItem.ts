import { Document } from 'mongoose';

export interface IWatchlistItem extends Document {
  name: string;
}
