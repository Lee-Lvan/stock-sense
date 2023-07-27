'use client';
import React, { useEffect, useState } from 'react';
import { IStock } from '../interfaces/IStock';
import { useSession, signOut } from 'next-auth/react';
import axios from 'axios';
import { getWatchlistData } from '../utils/twelvedata';
import getDefaultWatchlist from '../api/watchlist/getDefaultWatchlist';
import Link from 'next/link';
import WatchlistItem from './WatchlistItem';
import InvestmentItem from './InvestmentItem';

const UserHomepage = () => {
  const [results, setResults] = useState<IStock[]>([]);
  const [userData, setUserData] = useState();
  const [watchlist, setWatchlist] = useState([]);
  const [total, setTotal] = useState(0);

  const handleSetQuery = async (query: string) => {
    const response = await fetch(`/api/symbols?query=${query}`);
    const symbols = await response.json();
    setResults(symbols);
  };

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

  const { data: session } = useSession();

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

  const calculateUnrealisedProfit = () => {
    const capital = userData?.cash.toFixed(2);
    const symbols = userData?.holdings.map(item => item.name);
    const quantities = userData?.holdings.map(item => item.quantity);
    const buyPrices = userData?.holdings.map(item => item.buyPrice);
    const currentPrices = symbols?.map(symbol => {
      const match = watchlist.find(item => item.symbol === symbol);
      return match?.close;
    });
    const totalValues = [];
    for (let i = 0; i < currentPrices?.length; i++) {
      totalValues.push(currentPrices[i] * quantities[i]);
    }
    userData?.holdings.map((item, index) => {
      item.currentWorth = totalValues[index];
    });
    let accountBalance = 0;
    for (let i = 0; i < totalValues.length; i++) {
      accountBalance += totalValues[i];
    }
    return totalValues;
  };

  const investmentData = calculateUnrealisedProfit();
  const investmentTotal = investmentData.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  const invested = userData?.holdings.reduce((accumulator, currentHolding) => {
    return accumulator + +currentHolding.totalPrice;
  }, 0);

  console.log(investmentTotal);

  const portfolioPercentage = (
    ((+userData?.cash.toFixed(2) + investmentTotal - 10000) / investmentTotal) *
    100
  ).toFixed(2);

  console.log(invested);
  console.log(results);
  console.log(userData);
  console.log(watchlist);
  console.log(total);

  return (
    <div className="userhome-layout">
      <div className="userhome-left">
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
                .filter(item => item.exchange === 'NASDAQ' || item.exchange === 'NYSE')
                .reverse()
                .map((item: IStock) => (
                  <Link href={`/${item.symbol}`} className="single-result-layout" key={item._id}>
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

        <div className="card-layout">
          <h2 className="card-title">My Portfolio</h2>
          <div className="card-item-layout">
            <p className="balance-amount">
              {(+userData?.cash.toFixed(2) + investmentTotal).toLocaleString()} USD
            </p>

            <div className="card-item__info">
              {+userData?.cash.toFixed(2) + investmentTotal < 10000 ? (
                <p className="card-item__price-red">
                  {(+userData?.cash.toFixed(2) + investmentTotal - 10000).toLocaleString()} USD
                </p>
              ) : (
                <p className="card-item__price-green">
                  {(+userData?.cash.toFixed(2) + investmentTotal - 10000).toLocaleString()} USD
                </p>
              )}
              <p className="card-item__change">
                {typeof portfolioPercentage === 'NaN' ? portfolioPercentage : 0} %
              </p>
            </div>
          </div>
          <div className="capital-info-layout">
            <h4 className="capital-title">Capital Invested</h4>
            <p className="capital-amount">{invested} USD</p>
            <h4 className="capital-title">Capital Available</h4>
            <p className="capital-amount">{userData?.cash.toLocaleString()} USD</p>
          </div>
        </div>
        <div className="card-layout">
          <h2 className="card-title">Investments</h2>
          {userData?.holdings.map((item, index) => {
            return <InvestmentItem key={index} item={item} />;
          })}
        </div>
      </div>
      <div className="card-layout">
        <h2 className="card-title">My Watchlist</h2>
        {watchlist.map((item, index) => {
          return <WatchlistItem key={index} item={item} />;
        })}
      </div>
    </div>
  );
};

export default UserHomepage;
