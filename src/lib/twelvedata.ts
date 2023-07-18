import axios from 'axios';
import getWatchlist from '@/app/api/watchlist/getWatchlistItems';

export const getDefaultSymbols = async () => {
  const dbResponse = await getWatchlist();
  const symbols = dbResponse.map(item => {
    return item.name;
  });
  const dbSymbols = symbols.join(',');
  const api = process.env.API_KEY as string;
  const base_uri = `https://api.twelvedata.com/time_series?&apikey=${api}`;
  const params = new URLSearchParams();
  params.append('symbol', dbSymbols);
  params.append('interval', '5min');
  params.append('dp', '2');
  params.append('outputsize', '1');
  try {
    const response = await axios.get(base_uri, { params });
    return response.data;
  } catch (error) {
    const errorMessage = `Cannot get symbols: ${error}`;
    throw new Error(errorMessage);
  }
};
