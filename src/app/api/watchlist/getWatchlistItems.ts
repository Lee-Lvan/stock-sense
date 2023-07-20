import watchlistitems from '../../models/watchlistItemsModel';

const getWatchlist = async () => {
  const response = await watchlistitems.find({});
  const results = response.map(item => {
    return item.name;
  });
  const symbols = results.join(',');
  return symbols;
};

export default getWatchlist;
