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
    <div className='defaulthome-layout'>
      <p className='signin-prompt'><Link href={'/signin'} className='signin-text'>Sign in</Link>to start building your portfolio</p>
      <div className='card'>
        <h2 className='card-title'>Watchlist</h2>
        <section>
          {
            watchlist.map((item, index) => {
              return <WatchlistItem key={index} item={item} />
            })
          }
        </section>
      </div>
    </div>
  )
}

export default DefaultHomepage