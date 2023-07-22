import watchlistitems from '../../models/watchlistItemsModel';

const getDefaultWatchlist = async () => {
  const response = await watchlistitems.find({}).limit(5);
  return response;
};

export default getDefaultWatchlist;
