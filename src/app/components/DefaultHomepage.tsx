'use client'
import React, { useEffect, useState } from 'react'
import { getWatchlistData } from '../utils/twelvedata';
import WatchlistItem from './WatchlistItem';
import Link from 'next/link';


const DefaultHomepage = ({defaultData}) => {
  const [watchlist, setWatchlist] = useState([])

  useEffect(() => {
    const fetchDefaultWatchlist = async () => {
      const response = await getWatchlistData(defaultData)
      const defaultWatchlist = Object.values(response)
      setWatchlist(defaultWatchlist)
    } 
    fetchDefaultWatchlist()
  }, [])


  return (
    <div>
      <p><Link href={'/signin'}>click here</Link> to start building your portfolio</p>
      <h2>Watchlist</h2>
      <ul>
        {
          watchlist.map((item, index) => {
            return <WatchlistItem key={index} item={item} />
          })
        }
      </ul>
    </div>
  )
}

export default DefaultHomepage