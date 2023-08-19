import axios from 'axios';
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

export const getGraphData = async ([symbol, interval='5min', outputsize='78']: string[]) => {
  const base_uri = `https://api.twelvedata.com/time_series?apikey=${api}&dp=2`;
  const params = new URLSearchParams();
  params.append('symbol', symbol);
  params.append('interval', interval);
  params.append('outputsize', outputsize);
  try {
    const response = await axios.get(base_uri, { params });
    return response.data;
  } catch (error) {
    const errorMessage = `Cannot get graph data: ${error}`;
    throw new Error(errorMessage);
  }
};

