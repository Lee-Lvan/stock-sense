'use client';
import React from 'react';
import Link from 'next/link';

const InvestmentItem = ({ item }) => {
  return (
    <Link href={`/${item.name}`} className="card-item-layout">
      <article className="card-item">
        <div className="card-item__header">
          <p className="card-item__header-symbol">{item.name}</p>
          <p className="card-item__header-name">
            {item.quantity} Shares @ {item.buyPrice.toFixed(2)}
          </p>
        </div>
        <div className="card-item__info">
          {item.currentWorth < item.totalPrice ? (
            <p className="card-item__price-red">{item.currentWorth.toFixed(2)} USD</p>
          ) : (
            <p className="card-item__price-green">{item.currentWorth.toFixed(2)} USD</p>
          )}
          <p className="card-item__change">
            {(((item.currentWorth - item.totalPrice) / Math.abs(item.totalPrice)) * 100).toFixed(2)}{' '}
            %
          </p>
        </div>
      </article>
    </Link>
  );
};

export default InvestmentItem;
