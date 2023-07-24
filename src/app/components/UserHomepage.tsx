'use client'
import React, { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react';
import axios from 'axios';
import { getWatchlistData } from '../utils/twelvedata';
import getDefaultWatchlist from '../api/watchlist/getDefaultWatchlist';
import Link from 'next/link';
import WatchlistItem from './WatchlistItem';


const UserHomepage = () => {
  const { data: session } = useSession();

  const [userData, setUserData] = useState()
  const [watchlist, setWatchlist] = useState([])

  useEffect(() => {
    const fetchData = async () => {
          try {
            const userDataResponse = await axios.get(`/api/users?query=${session?.user?.email}`);
            setUserData(userDataResponse.data);
            const query = userDataResponse.data.watchlist.map((item) => item.name).join(',');
            const watchlistResponse = await getWatchlistData(query);
            const userWatchlist = Object.values(watchlistResponse)
            setWatchlist(userWatchlist);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
      };
      fetchData()
  }, [])

  return (
    <>
      <h2>My Portfolio</h2>
      <h3>Portfolio Balance</h3>
      <p>userData.cash + holdings total value</p>
      <h3>Cash Balance</h3>
      <p>${userData?.cash.toLocaleString()}</p>
      <h2>Investments</h2>
      <ul>
      {
        userData?.holdings.map((item, index) => {
          // return <WatchlistItem key={index} item={item} />
        })
      }
      </ul>
      <h2>My Watchlist</h2>
      <ul>
      {
        watchlist.map((item, index) => {
          return <WatchlistItem key={index} item={item} />
        })
      }
      </ul>
    </>
  )
}

export default UserHomepage
