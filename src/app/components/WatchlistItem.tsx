import React from 'react';
import Link from 'next/link';

const WatchlistItem = ({ item }) => {
  return (
    <Link href={`/${item.symbol}`} className="card-item-layout">
      <article className="card-item">
        <div className="card-item__header">
          <p className="card-item__header-symbol">{item.symbol}</p>
          <p className="card-item__header-name">{item.name}</p>
        </div>
        <div className="card-item__info">
          {item.percent_change < 0 ? (
            <p className="card-item__price-red">
              {item.close ? item.close : <span>Loading...</span>} {item.currency}
            </p>
          ) : (
            <p className="card-item__price-green">
              {item.close ? item.close : <span>Loading...</span>} {item.currency}
            </p>
          )}
          <p className="card-item__change">{item.percent_change} %</p>
        </div>
      </article>
    </Link>
  );
};

export default WatchlistItem;
