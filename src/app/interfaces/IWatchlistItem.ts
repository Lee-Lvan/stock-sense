import { Document } from 'mongoose';

export interface IWatchlistItem extends Document {
  id: string;
  name: string;
}
