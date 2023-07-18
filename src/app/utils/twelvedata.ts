import axios from 'axios';
import getWatchlist from '@/app/api/watchlist/getWatchlistItems';

const api = process.env.API_KEY as string;

export const getWatchlistData = async (watchlist: string) => {
  const base_uri = `https://api.twelvedata.com/quote?apikey=${api}&dp=2`;
  const params = new URLSearchParams();
  params.append('symbol', watchlist);
  try {
    const response = await axios.get(base_uri, { params });
    return response.data;
  } catch (error) {
    const errorMessage = `Cannot get watchlist data: ${error}`;
    throw new Error(errorMessage);
  }
};

export const getGraphData = async (symbol: string) => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const todaysDate = `${year}-${month}-${day}`;
  
  const base_uri = `https://api.twelvedata.com/time_series?apikey=${api}&dp=2`;
  const params = new URLSearchParams();
  params.append('symbol', symbol);
  params.append('interval', '5min');
  params.append('start_date', `${todaysDate} 00:00:00`);
  try {
    const response = await axios.get(base_uri, { params });
    return response.data;
  } catch (error) {
    const errorMessage = `Cannot get graph data: ${error}`;
    throw new Error(errorMessage);
  }
};
