'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { getWatchlistData } from '@/app/utils/twelvedata';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

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
    router.push(`/`);
  };

  return (
    <section className="trade__layout">
      <span className="back-btn__containter">
        <Link href={`/${slug}`}>
          <FontAwesomeIcon icon={faArrowLeft} className="back-btn" />
        </Link>
      </span>
      <article className="trade-header">
        <h1 className="trade-header-title">Sell {slug}</h1>
        <p className="trade-header-info">Market Order</p>
        <p className="trade-header-info">
          1 {slug} = {companyData?.close} {companyData?.currency}
        </p>
      </article>
      {userCurrentHoldings !== 0 && (
        <form onSubmit={handleSellOrder} className="sell-card-list__layout">
          {userData?.holdings.map((item, index) => {
            if (item.name === slug) {
              return (
                <>
                  <input type="hidden" name="_id" value={item._id} />

                  <article className="sell-card__layout">
                    <div className='sell-card-header__layout'>
                      <h3 className='sell-card-symbol'>{item.name}</h3>
                      <p className='sell-card-info'>
                        <span className='sell-card-quantity'>{item.quantity}</span>
                         {' '}shares @ {' '}
                        <span className='sell-card-price'>{item.buyPrice} {companyData?.currency}</span>
                      </p>
                    </div>
                  <input
                    className="sell-card-input"
                    // placeholder='0 shares'
                    type="number"
                    name="sellQuantity"
                    defaultValue={0}
                    min={0}
                    max={item.quantity}
                    required
                  />
                  </article>
                </>
              );
            }
          })}
          <button className="sell-btn">Sell {slug}</button>
        </form>
      )}
      {!userCurrentHoldings && <button className="no-share" disabled>You have no shares to sell</button>}
    </section>
  );
};

export default Sell;
