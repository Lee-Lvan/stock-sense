'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getWatchlistData } from '@/app/utils/twelvedata';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Buy = () => {
  const [companyData, setCompanyData] = useState();
  const [userData, setUserData] = useState();
  const [count, setCount] = useState(1);
  const [boughtShares, setBoughtShares] = useState();
  const [insufficientFunds, setInsufficientFunds] = useState(false);

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

  const purchaseData = {
    name: slug,
    quantity: count,
    price: companyData?.close * count,
  };

  const updateUserHoldings = async () => {
    try {
      const response = await axios.put(`/api/users?user=${session?.user?.email}`, purchaseData);
      console.log(response.data);
      if (response.data.message === 'Insufficient funds') {
        setInsufficientFunds(true);
      }
      router.push(`/${slug}`);
    } catch (error) {
      console.log('not good', error);
    }
  };
  console.log(insufficientFunds);

  let userCurrentHoldings = 0;
  userData?.holdings.forEach(item => {
    if (item.name === slug) {
      userCurrentHoldings += +item.quantity;
    }
  });

  console.log(boughtShares);

  return (
    <>
      <h1>Buy {slug}</h1>
      <p>Market Order</p>
      <p>
        1 {slug} = {companyData?.close} {companyData?.currency}
      </p>
      <br />
      <br />
      <h3>{slug}</h3>
      <p>Owned: {userCurrentHoldings} shares</p>
      <br />
      <br />
      <h3>USD</h3>
      <p>Capital: {userData?.cash}</p>
      <br />
      <br />
      <p>
        You are about to buy <strong>{count}</strong> shares
      </p>
      <button onClick={handleDecrement}>-</button>
      <button onClick={handleIncrement}>+</button>
      <br />
      <br />
      <button onClick={updateUserHoldings}>Buy {slug}</button>
      {insufficientFunds && <p>Insufficient funds</p>}
    </>
  );
};

export default Buy;
