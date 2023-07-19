import Link from 'next/link';
import styles from './page.module.css';
import { getWatchlistData } from '@/app/utils/twelvedata';
import getWatchlist from './api/watchlist/getWatchlistItems';
import { IWatchlistData } from './types/Symbol.type';

export default async function Home() {
  const userWatchlist = await getWatchlist(); // update this when we have profiles
  const data = await getWatchlistData(userWatchlist);
  const symbolData: IWatchlistData[] = Object.values(data);
  // console.log(symbolData);
  return (
    <>
      <ul>
        <li>trade</li>
        <li>learn</li>
      </ul>
      <input type="text" name="searchbar" id="searchbar" placeholder="Search for a stock" />
      <h2>Portfolio</h2>
      <p>
        <Link href={'login'}>Login</Link> or <Link href={'signup'}>signup</Link> to see your portfolio
      </p>
      <h2>Watchlist</h2>
      <ul>
        {symbolData.map(data => (
          <li key={data.symbol}>
            <Link href={`/${data.symbol}`}>
              {data.symbol} - {data.name}
            </Link>
            <span>{data.close} US$</span>
          </li>
        ))}
      </ul>
    </>
  );
}
