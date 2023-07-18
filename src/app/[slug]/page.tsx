import React from 'react';
import { getDefaultSymbols } from '@/lib/twelvedata';

const Symbol = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const data = await getDefaultSymbols();
  const symbols = Object.values(data);
  // console.log(symbols);
  const symbol = symbols.find((symbol: any) => symbol.meta.symbol === slug);
  
  if(!symbol) return null;
  const {open, high, low, close, volume} = symbol.values[0];
  // console.log(symbol.values[0]);
  
    return (
      <>
        <h1>{symbol.meta.symbol}</h1>
        <p>open: {open}</p>
        <p>high: {high}</p>
        <p>low: {low}</p>
        <p>close: {close}</p>
        <p>volume: {volume}</p>
      </>
    );
  };

export default Symbol;
