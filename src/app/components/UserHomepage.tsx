'use client';
import React, { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import axios from 'axios';
import { getWatchlistData } from '../utils/twelvedata';
import getDefaultWatchlist from '../api/watchlist/getDefaultWatchlist';
import Link from 'next/link';
import WatchlistItem from './WatchlistItem';

const UserHomepage = () => {
  const { data: session } = useSession();

  const [userData, setUserData] = useState();
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataResponse = await axios.get(`/api/users?query=${session?.user?.email}`);
        setUserData(userDataResponse.data);
        const query = userDataResponse.data.watchlist.map(item => item.name).join(',');
        const watchlistResponse = await getWatchlistData(query);
        const userWatchlist = Object.values(watchlistResponse);
        setWatchlist(userWatchlist);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="userhome-layout">
      <div className="card">
        <h2 className="card-title">My Portfolio</h2>
        <h3>Captial</h3>
        <p>userData.cash + holdings total value</p>
        <h3>Available to Invest</h3>
        <p>${userData?.cash.toLocaleString()}</p>
      </div>

      <div className="card">
        <h2 className="card-title">Investments</h2>
        <section>
          {userData?.holdings.map((item, index) => {
            // return <WatchlistItem key={index} item={item} />
          })}
        </section>
      </div>

      <div className="card">
        <h2 className="card-title">My Watchlist</h2>
        <section>
          {watchlist.map((item, index) => {
            return <WatchlistItem key={index} item={item} />;
          })}
        </section>
      </div>
    </div>
  );
};

export default UserHomepage;
