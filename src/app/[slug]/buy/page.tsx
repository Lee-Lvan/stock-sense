'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getWatchlistData } from '@/app/utils/twelvedata';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { IUser } from '@/app/interfaces/IUser';
import { CompanyData } from '@/app/types/CompanyData.type';
import { Session } from '@/app/types/Session.type';
import Loader from '@/app/components/Loader';

const Buy = () => {
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [userData, setUserData] = useState<IUser | null>(null);
  const [count, setCount] = useState(1);

  const { data: session } = useSession() as { data: Session };
  const { slug } = useParams() as { slug: string };
  const router = useRouter();

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    (async () => {
      const companyDataResponse = await getWatchlistData(slug);
      const userDataResponse = await axios.get(
        `/api/users?query=${session?.user?.email}`,
      );
      setCompanyData(companyDataResponse);
      setUserData(userDataResponse.data);
    })();
  }, [slug, session?.user?.email]);

  const transactionData = {
    name: slug,
    quantity: count,
    exchange: companyData?.exchange,
    buyPrice: companyData?.close,
    totalPrice: companyData && (+companyData?.close * count).toFixed(2),
  };

  const updateUserHoldings = async () => {
    try {
      await axios.put(`/api/users?user=${session.user.email}`, transactionData);
      router.push(`/`);
    } catch (error) {
      console.error('Error updating user holdings -->', error);
    }
  };

  let userCurrentHoldings = 0;
  userData?.holdings.forEach(item => {
    if (item.name === slug.toUpperCase()) {
      userCurrentHoldings += +item.quantity;
    }
  });

  return (
    <section className="trade__layout">
      <span className="back-btn__containter">
        <Link href={`/${slug}`}>
          <FontAwesomeIcon icon={faArrowLeft} className="back-btn" />
        </Link>
      </span>
      {!companyData && !userData && <Loader />}
      {companyData && userData && (
        <>
          <article className="trade-header">
            <h1 className="trade-header-title">Buy {slug.toUpperCase()}</h1>
            <p className="trade-header-info">Market Order</p>
            <p className="trade-header-info">
              1 {slug.toUpperCase()} = {companyData.close}{' '}
              {companyData.currency}
            </p>
          </article>
          <article className="trade-card__layout">
            <h3 className="trade-card-symbol">{slug.toUpperCase()}</h3>
            <div className="trade-card-shares__layout">
              <p className="trade-card-shares">{userCurrentHoldings} shares</p>
              <p className="trade-card-owned">Owned</p>
            </div>
          </article>
          <article className="trade-card__layout">
            <p className="trade-card-capital">Capital Available</p>
            <p className="trade-card-amount">{userData.cash.toFixed(2)} USD</p>
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
              {(+companyData.close * count).toFixed(2)} {companyData?.currency}
            </p>
          </div>
          {+companyData.close * count < userData.cash ? (
            <button onClick={updateUserHoldings} className="trade-btn">
              Buy {slug}
            </button>
          ) : (
            <button disabled className="disable-btn">
              Insufficient Capital
            </button>
          )}
        </>
      )}
    </section>
  );
};

export default Buy;
