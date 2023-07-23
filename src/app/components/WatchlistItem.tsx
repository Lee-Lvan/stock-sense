import React from 'react'
import Link from 'next/link'

const WatchlistItem = ({item}) => {
  return (
    <li>
      <Link href={`/${item.symbol}`}>{item.symbol} - {item.name} - {item.close}</Link>
    </li>
  )
}

export default WatchlistItem