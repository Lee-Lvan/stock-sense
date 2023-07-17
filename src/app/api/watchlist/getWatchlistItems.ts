import { connectToMongo } from '../../utils/connectToMongo';
import watchlistItems from '../../models/watchlistItemsModel';

const getWatchlist = async () => {
  connectToMongo();
  const watchlist = await watchlistItems.find({});
  return watchlist;
};

export default getWatchlist;
