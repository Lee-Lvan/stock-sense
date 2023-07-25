'use client';
import React from 'react';
import Link from 'next/link';

const InvestmentItem = ({ item }) => {
  return (
    <Link href={`/${item.name}`}>
      <article className="watchlist-item">
        <div className="watchlist-item__header">
          <p className="watchlist-item__header-symbol">{item.name}</p>
          <p className="watchlist-item__header-name">{item.name}</p>
        </div>
        <div className="watchlist-item__info">
          {item.percent_change < 0 ? (
            <p className="watchlist-item__price-red">
              {item.price} {item.currency}
            </p>
          ) : (
            <p className="watchlist-item__price-green">
              {item.close} {item.currency}
            </p>
          )}
          <p className="watchlist-item__change">{item.percent_change} %</p>
        </div>
      </article>
    </Link>
  );
};

export default InvestmentItem;
