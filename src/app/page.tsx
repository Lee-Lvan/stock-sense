import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';
import getWatchlist from './api/watchlist/getWatchlistItems';

export default async function Home() {
  const watchlistItems = await getWatchlist();

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
        {watchlistItems.map(item => {
          return <li key={item._id}>{item.name}</li>;
        })}
      </ul>
      <p>
        <Link href={'login'}>Login</Link> or
        <Link href={'signup'}>signup</Link> to see your portfolio
      </p>
    </>
  );
}
