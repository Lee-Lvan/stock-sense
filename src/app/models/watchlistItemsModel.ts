import { Schema, model, models } from 'mongoose';
import { IWatchlistItem } from '../interfaces/IWatchlistItem';

const watchlistItemsSchema = new Schema<IWatchlistItem>({
  name: String,
});

export default models.watchlistItems ||
  model('watchlistItems', watchlistItemsSchema);
