import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
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
        <li>tsla</li>
        <li>tsla</li>
        <li>tsla</li>
        <li>tsla</li>
      </ul>
      <p>
        <Link href={'login'}>Login</Link> or
        <Link href={'signup'}>signup</Link> to see your portfolio
      </p>
    </>
  );
}
