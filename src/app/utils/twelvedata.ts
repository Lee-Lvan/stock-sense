import axios from 'axios';
import getWatchlist from '@/app/api/watchlist/getWatchlistItems';
import fs from 'fs';

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

interface IStock {
  symbol: string;
  name: string;
  exchange: string;
  access: {
    plan: string;
  }
};
  

export const getStock = async (): Promise<IStock[]> => {
  const uri = `https://api.twelvedata.com/stocks?apikey=${api}&show_plan=true`;
  try {
    const response = await axios.get(uri);
    return response.data;
  } catch (error) {
    const errorMessage = `Try harder: ${error}`;
    throw new Error(errorMessage);
  }
};

// export const saveToFile = async () => {
//   try {
//     const stockList = await getStock() as any;
//     console.log(stockList);
//     console.log(stockList.data);
//     const file = stockList.data
//       .filter((stock: IStock ) => stock.access.plan === 'Grow' || stock.access.plan === 'Basic')
     
//       .map((stock: IStock) => ({
//         symbol: stock.symbol,
//         name: stock.name,
//         exchange: stock.exchange,
//       }));
//     fs.writeFileSync('stocklist.json', JSON.stringify(file, null, 2));
//   } catch (error) {
//     console.log(error);
//   }
// };
