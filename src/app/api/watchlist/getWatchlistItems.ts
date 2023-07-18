import WatchlistItem from "../../models/watchlistItemsModel";

const getWatchlist = async () => {
  return await WatchlistItem.find({});
};

export default getWatchlist;
