'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getWatchlistData } from '@/app/utils/twelvedata';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
// import { uuid } from 'uuidv4';

const Buy = () => {
  const [companyData, setCompanyData] = useState();
  const [userData, setUserData] = useState();
  const [count, setCount] = useState(1);
  const [boughtShares, setBoughtShares] = useState();

  const router = useRouter();
  const { data: session } = useSession();
  const { slug } = useParams() as { slug: string };

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleBuyShares = () => {
    setBoughtShares(count);
  };

  useEffect(() => {
    const fetchData = async () => {
      const companyDataResponse = await getWatchlistData(slug);
      const userDataResponse = await axios.get(`/api/users?query=${session?.user?.email}`);
      setCompanyData(companyDataResponse);
      setUserData(userDataResponse.data);
    };
    fetchData();
  }, []);

  const transactionData = {
    name: slug,
    quantity: count,
    buyPrice: +companyData?.close,
    totalPrice: +(companyData?.close * count).toFixed(2),
  };

  console.log(transactionData);

  const updateUserHoldings = async () => {
    try {
      console.log('transactionData', transactionData);
      await axios.put(`/api/users?user=${session?.user?.email}`, transactionData);
      router.push(`/${slug}`);
    } catch (error) {
      console.log('not good', error);
    }
  };

  let userCurrentHoldings = 0;
  userData?.holdings.forEach(item => {
    if (item.name === slug) {
      userCurrentHoldings += +item.quantity;
    }
  });

  return (
    <section className="trade__layout">
      <span className="back-btn__containter">
        <Link href={`/`}>
          <FontAwesomeIcon icon={faArrowLeft} className="back-btn" />
        </Link>
      </span>
      <article className="trade-header">
        <h1 className="trade-header-title">Buy {slug}</h1>
        <p className="trade-header-info">Market Order</p>
        <p className="trade-header-info">
          1 {slug} = {companyData?.close} {companyData?.currency}
        </p>
      </article>
      <article className="trade-card__layout">
        <h3 className="trade-card-symbol">{slug}</h3>
        <div className="trade-card-shares__layout">
          <p className="trade-card-shares">{userCurrentHoldings} shares</p>
          <p className="trade-card-owned">Owned</p>
        </div>
      </article>
      <article className="trade-card__layout">
        <p className="trade-card-capital">Capital Available</p>
        <p className="trade-card-amount">{userData?.cash.toFixed(2)} USD</p>
      </article>
      <div className="trade-cal-layout">
        <button onClick={handleDecrement} className="trade-cal-btn">
          -
        </button>
        <p className="trade-amount">{count}</p>
        <button onClick={handleIncrement} className="trade-cal-btn">
          +
        </button>
      </div>
      <div className="trade-total__layout">
        <p className="trade-total-title">Total Price</p>
        <p className="trade-total-price">
          {(companyData?.close * count).toFixed(2)} {companyData?.currency}
        </p>
      </div>
      {companyData?.close * count < userData?.cash ? (
        <button onClick={updateUserHoldings} className="trade-btn">
          Buy {slug}
        </button>
      ) : (
        <button disabled className="disable-btn">
          Insufficient Funds
        </button>
      )}
    </section>
  );
};

export default Buy;
