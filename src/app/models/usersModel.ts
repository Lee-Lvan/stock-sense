import { Schema, model, models } from 'mongoose';
import { IUser } from '../interfaces/IUser';

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  watchlist: [{ type: Schema.Types.ObjectId, ref: 'Watchlistitem'}],
  holdings: [],
  cash: {type: Number, required: true}
});

const User = models.User ?? model<IUser>('User', userSchema);

export default User;