'use client';
import React, { useEffect, useState } from 'react';
import { IStock } from '../interfaces/IStock';
import { getWatchlistData } from '../utils/twelvedata';
import WatchlistItem from './WatchlistItem';
import Link from 'next/link';
import { CompanyData } from '../types/CompanyData.type';

type DefaultHomepageProps = {
  defaultData: string;
};

const DefaultHomepage: React.FC<DefaultHomepageProps> = ({ defaultData }) => {
  const [results, setResults] = useState<IStock[]>([]);

  const handleSetQuery = async (query: string) => {
    const response = await fetch(`/api/symbols?query=${query}`);
    const symbols = await response.json();
    setResults(symbols);
  };

  const [watchlist, setWatchlist] = useState<CompanyData[]>([]);

  useEffect(() => {
    const fetchDefaultWatchlist = async () => {
      const response = await getWatchlistData(defaultData);
      const defaultWatchlist: CompanyData[] = Object.values(response);
      setWatchlist(defaultWatchlist);
    };
    fetchDefaultWatchlist();
  }, [defaultData]);

  const getFormattedDate = () => {
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const today = new Date();
    const dayOfWeek = daysOfWeek[today.getDay()];
    const month = months[today.getMonth()];
    const date = today.getDate();

    return `${dayOfWeek} ${month} ${date}`;
  };
  const date = getFormattedDate();

  return (
    <div className="default-layout">
      <div className="left">
        <p className="date">{date}</p>
        <div className="search">
          <input
            className="search-input"
            onChange={e => handleSetQuery(e.target.value)}
            type="text"
            name="searchbar"
            id="searchbar"
            placeholder="Search for a stock"
          />
          {results && (
            <ul className="search-results">
              {results
                .filter(
                  item =>
                    item.exchange === 'NASDAQ' || item.exchange === 'NYSE',
                )
                .reverse()
                .map((item: IStock) => (
                  <Link
                    href={`/${item.symbol}`}
                    className="single-result-layout"
                    key={item._id}
                  >
                    <li className="single-search-result">
                      <p className="symbol">{item.symbol}</p>
                      <p className="name">{item.name}</p>
                      <p className="exchange">{item.exchange}</p>
                    </li>
                  </Link>
                ))}
            </ul>
          )}
        </div>
        <p className="signin-prompt">
          <Link href={'/signin'} className="signin-text">
            Sign in
          </Link>
          to build your portfolio
        </p>
      </div>
      <div className="card-layout">
        <h2 className="card-title">Watchlist</h2>
        {watchlist.map((item, index) => {
          return <WatchlistItem key={index} item={item} />;
        })}
      </div>
    </div>
  );
};

export default DefaultHomepage;
