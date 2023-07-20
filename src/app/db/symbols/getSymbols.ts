'use server';
import Stock, { IStock } from '../../models/stockModel';

const getSymbols = async (query: string) => {
  console.log('getSymbols', query);
  const stocks = await Stock.find({
    symbol: { $regex: new RegExp(query, 'i') },
  }).limit(10);
  console.log('stocks', stocks);
  return stocks;
};

export default getSymbols;
