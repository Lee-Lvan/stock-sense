import axios from 'axios';

const api = process.env.API_KEY as string;
const base_uri = `https://api.twelvedata.com/time_series?&apikey=${api}`;

const params = new URLSearchParams();
params.append('symbol', 'AAPL,ADBE,TSLA,GOOGL,MSFT');
params.append('interval', '5min');
params.append('dp', '2');
params.append('outputsize', '2');

export const getDefaultSymbols = async () => {
  try {
    const response = await axios.get(base_uri, { params });
    return response.data;

  } catch (error) {
    const errorMessage = `Cannot get symbols: ${error}`;
    throw new Error(errorMessage);
  }
}

