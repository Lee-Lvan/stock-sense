import watchlistitems from '../../models/watchlistItemsModel';
import { WatchlistT } from '@/app/types/Watchlist.type';

const getDefaultWatchlist = async (): Promise<WatchlistT[]> => await watchlistitems.find({}).limit(5);

export default getDefaultWatchlist;
