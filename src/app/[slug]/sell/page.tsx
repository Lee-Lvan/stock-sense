'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { getWatchlistData } from '@/app/utils/twelvedata';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Sell = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { slug } = useParams() as { slug: string };
  const [companyData, setCompanyData] = useState();
  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchChartData = async () => {
      const companyDataResponse = await getWatchlistData(slug);
      setCompanyData(companyDataResponse);
    };
    const fetchUserData = async () => {
      const userDataResponse = await axios.get(`/api/users?query=${session?.user?.email}`);
      setUserData(userDataResponse.data);
    };
    fetchChartData();
    fetchUserData();
  }, []);

  let userCurrentHoldings = 0;
  userData?.holdings.forEach(item => {
    if (item.name === slug) {
      userCurrentHoldings += +item.quantity;
    }
  });

  const handleSellOrder = async e => {
    e.preventDefault();
    const form = e.target;
    const sellQuantityData = form.elements.sellQuantity;
    const transactionIdsData = form.elements._id;

    console.log(form);
    console.log(sellQuantityData);
    console.log(transactionIdsData.value);
    console.log(transactionIdsData.length);

    const transactionData = [];

    if (transactionIdsData.length === undefined) {
      transactionData.push({
        _id: transactionIdsData.value,
        sharesToSell: sellQuantityData.value,
        currentPrice: companyData?.close,
      });
    }

    for (let i = 0; i < transactionIdsData.length; i++) {
      console.log(i);
      transactionData.push({
        _id: transactionIdsData[i].value,
        sharesToSell: sellQuantityData[i].value,
        currentPrice: companyData?.close,
      });
      console.log(transactionIdsData[i].value);
      console.log(sellQuantityData[i].value);
    }

    console.log(transactionData);
    console.log(typeof transactionData);
    await axios.put(`/api/users?user=${session?.user?.email}`, transactionData);
    router.push(`/${slug}/sell`);
  };

  return (
    <>
      <h1>Sell {slug}</h1>
      <p>Market Order</p>
      <p>
        Current Price = {companyData?.close} {companyData?.currency}
      </p>

      <br />
      <br />
      {userCurrentHoldings !== 0 && (
        <form onSubmit={handleSellOrder}>
          <h3>Price</h3>
          <h3>Buy Price</h3>
          <h3>Shares</h3>
          <h3>Sell</h3>
          {userData?.holdings.map((item, index) => {
            if (item.name === slug) {
              return (
                <>
                  <input type="hidden" name="_id" value={item._id} />
                  <input type="text" name="symbol" disabled value={item.name} />
                  <input type="text" name="buyPrice" disabled value={item.buyPrice} />
                  <input type="text" name="shares" disabled value={item.quantity} />
                  <input
                    type="number"
                    name="sellQuantity"
                    defaultValue={0}
                    min={0}
                    max={item.quantity}
                    required
                  />
                  <br />
                  <br />
                </>
              );
            }
          })}
          <button>Sell {slug}</button>
        </form>
      )}

      {!userCurrentHoldings && <p>You have no shares to sell</p>}

      <br />
      <br />
    </>
  );
};

export default Sell;
