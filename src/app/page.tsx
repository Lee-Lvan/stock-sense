import Link from 'next/link';
import styles from './page.module.css';
import Image from 'next/image';
import { getDefaultSymbols } from '@/lib/twelvedata';
import getWatchlist from './api/watchlist/getWatchlistItems';

export default async function Home() {
  const watchlistItems = await getWatchlist();
  const data = await getDefaultSymbols();
  const defaultSymbols = Object.values(data);
  return (
    <>
      <ul>
        <li>trade</li>
        <li>learn</li>
      </ul>
      <input
        type="text"
        name="searchbar"
        id="searchbar"
        placeholder="Search for a stock"
      />
      <h2>watchlist</h2>
      <ul>
        {defaultSymbols.map((symbol: any, i) => (
          <li key={symbol.meta.symbol + i}>
            <Link href={`/${symbol.meta.symbol}`}>{symbol.meta.symbol}</Link>
            <span>$ {symbol.values[0].close}</span>
          </li>
        ))}
      </ul>
      <p>
        <Link href={'login'}>Login</Link> or
        <Link href={'signup'}>signup</Link> to see your portfolio
      </p>
    </>
  );
}
