import { Document } from 'mongoose';
import { WatchlistT } from '../types/Watchlist.type';
import { HoldingsT } from '../types/Holdings.type';

export interface IUser extends Document {
  email: string;
  // username: string;
  password: string;
  watchlist: WatchlistT[];
  holdings: HoldingsT[];
}
