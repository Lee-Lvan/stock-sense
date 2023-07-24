import React from 'react'
import Link from 'next/link'

const WatchlistItem = ({item}) => {
  return (
    <Link href={`/${item.symbol}`}>
      <article className='watchlist-item'>
          <div className='watchlist-item__header'>
            <p className='watchlist-item__header-symbol'>
              {item.symbol}
            </p>
            <p className='watchlist-item__header-name'>
              {item.name}
            </p>
          </div>
          <div className='watchlist-item__info'>
          {item.percent_change < 0 ?
            <p className='watchlist-item__price-red'>
              {item.close} {item.currency}
            </p>
           :
            <p className='watchlist-item__price-green'>
              {item.close} {item.currency}
          </p>
          }
          <p className='watchlist-item__change'>
            {item.percent_change} %
          </p>
          </div>
      </article>
    </Link>
  )
}

export default WatchlistItem