import watchlistItems from '../../models/watchlistItemsModel';

const getWatchlist = async () => {
  return await watchlistItems.find({});
};

export default getWatchlist;
