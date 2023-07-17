import { Schema, model, models } from 'mongoose';

const watchlistItemsSchema = new Schema({
  name: String,
});

export default models.watchlistItems ||
  model('watchlistItems', watchlistItemsSchema);
