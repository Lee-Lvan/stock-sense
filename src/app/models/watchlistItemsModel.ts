import { Schema, model, models } from 'mongoose';
import { IWatchlistItem } from '../interfaces/IWatchlistItem';

const watchlistItemsSchema = new Schema<IWatchlistItem>({
  id: { type: String, required: true },
  name: { type: String, required: true },
});

export default models.watchlistitems ||
  model('watchlistitems', watchlistItemsSchema);
