import { Schema, model, models } from 'mongoose';
import { IWatchlistItem } from '../interfaces/IWatchlistItem';

const watchlistItemsSchema = new Schema<IWatchlistItem>({
  name: { type: String, required: true },
});

const Watchlistitem  = models.Watchlistitem ?? model('Watchlistitem', watchlistItemsSchema);

export default Watchlistitem