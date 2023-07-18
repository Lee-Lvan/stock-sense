import { Schema, model, models } from 'mongoose';
import { IUser } from '../interfaces/IUser';
import { WatchlistT } from '../types/Watchlist.type';
import { HoldingsT } from '../types/Holdings.type';

const watchlistSchema = new Schema<WatchlistT>({
  id: { type: String, required: true },
});

const holdingsSchema = new Schema<HoldingsT>({
  id: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  watchlist: [watchlistSchema],
  holdings: [holdingsSchema],
});

const UserModel = models.User || model<IUser>('User', userSchema);

export default UserModel;
