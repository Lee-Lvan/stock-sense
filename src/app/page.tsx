import Link from 'next/link';
import styles from './page.module.css';
import { getWatchlistData } from '@/app/utils/twelvedata';
import getWatchlist from './db/watchlist/getWatchlistItems';
import { IWatchlistData } from './types/Symbol.type';
import Searchbar from './components/Searchbar';

export default async function Home() {
  const userWatchlist = await getWatchlist(); // update this when we have profiles
  console.log(userWatchlist);
  const data = await getWatchlistData(userWatchlist);
  const symbolData: IWatchlistData[] = Object.values(data);

  return (
    <>
      <ul>
        <li>trade</li>
        <li>learn</li>
      </ul>
      <Searchbar />
      <h2>Portfolio</h2>
      <p>
        <Link href={'login'}>Login</Link> or <Link href={'signup'}>signup</Link>
        to see your portfolio
      </p>
      <h2>Watchlist</h2>
      <ul>
        {symbolData.map(data => (
          <li key={data.symbol}>
            <Link href={`/${data.symbol}`}>
              {data.symbol} - {data.name}
            </Link>
            <br />
            <span>${data.close}</span>
            <br />
            <br />
          </li>
        ))}
      </ul>
    </>
  );
}
