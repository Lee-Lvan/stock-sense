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

export const getGraphData = async (symbol: string) => {
  const base_uri = `https://api.twelvedata.com/time_series?apikey=${api}&dp=2`;
  const params = new URLSearchParams();
  params.append('symbol', symbol);
  params.append('interval', '5min');
  params.append('outputsize', '78');
  try {
    const response = await axios.get(base_uri, { params });
    return response.data;
  } catch (error) {
    const errorMessage = `Cannot get graph data: ${error}`;
    throw new Error(errorMessage);
  }
};

export const getStocks = async () => {
  const base_uri = `https://api.twelvedata.com/stocks?apikey=${api}&show_plan=true`;
  try {
    const response = await axios.get(base_uri);
    return response.data;
  } catch (error) {
    const errorMessage = `stop trying to be clever`;
    throw new Error(errorMessage);
  }
};
