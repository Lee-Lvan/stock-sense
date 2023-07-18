import axios from 'axios';
import getWatchlist from '@/app/api/watchlist/getWatchlistItems';
import { WatchlistItemT } from '../types/WatchlistItem.type';


export const getWatchlistData = async (watchlist: string) => {
  const api = process.env.API_KEY as string;
  const base_uri = `https://api.twelvedata.com/quote?apikey=${api}`;
  const params = new URLSearchParams();
  params.append('symbol', watchlist);
  params.append('dp', '2');
  try {
    const response = await axios.get(base_uri, { params });
    return response.data;
  } catch (error) {
    const errorMessage = `Cannot get symbols: ${error}`;
    throw new Error(errorMessage);
  }
};

export const getGraphData = async () => {
  // time series data to popluate the graph
};
