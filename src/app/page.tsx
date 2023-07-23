import styles from './page.module.css';
import getDefaultWatchlist from './api/watchlist/getDefaultWatchlist';
import { IWatchlistData } from './types/Symbol.type';
import Searchbar from './components/Searchbar';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';

export default async function Home() {
  const response = await getDefaultWatchlist()
  const defaultData = response.map(item => item.name).join(',') 

  return (
    <>
      <Navbar />
      <Searchbar />
      <Dashboard defaultData={defaultData}/>
    </>
  );
}
