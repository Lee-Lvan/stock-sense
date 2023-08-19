import getDefaultWatchlist from './api/watchlist/getDefaultWatchlist';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';

export default async function Home() {
  const response = await getDefaultWatchlist();
  const defaultData = response.map(item => item.name).join(',');

  return (
    <div className='main'>
      <Navbar />
      <Dashboard defaultData={defaultData} />
    </div>
  );
}
