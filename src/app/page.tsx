import styles from './page.module.css';
import getDefaultWatchlist from './api/watchlist/getDefaultWatchlist';
import { IWatchlistData } from './types/Symbol.type';
import Searchbar from './components/Searchbar';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';

export default async function Home() {
  const response = await getDefaultWatchlist()
  const defaultData = response.map(item => item.name).join(',') 

  
const getFormattedDate = () => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const today = new Date();
  const dayOfWeek = daysOfWeek[today.getDay()];
  const month = months[today.getMonth()];
  const date = today.getDate();

  return `${dayOfWeek} ${month} ${date}`;
}

const date = getFormattedDate();

  return (
    <>
      <Navbar />
      <p>{date}</p>
      <Searchbar />
      <Dashboard defaultData={defaultData}/>
    </>
  );
}
