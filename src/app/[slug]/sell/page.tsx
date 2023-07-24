'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getWatchlistData } from '@/app/utils/twelvedata'
import axios from 'axios'
import { useSession } from 'next-auth/react'

const Sell = () => {
  const {data: session} = useSession()
  const { slug } = useParams() as { slug: string };
  const [companyData, setCompanyData] = useState();
  const [userData, setUserData] = useState()

  useEffect(() => {
    const fetchChartData = async () => {
      const companyDataResponse = await getWatchlistData(slug);
      console.log(companyDataResponse)
      setCompanyData(companyDataResponse);
    }
    const fetchUserData = async () => {
      const userDataResponse = await axios.get(`/api/users?query=${session?.user?.email}`);
      setUserData(userDataResponse.data);
    }
    fetchChartData();
    fetchUserData();
  }, [])

  let userCurrentHoldings = 0
  userData?.holdings.forEach(item => {
    if (item.name === slug) {
      userCurrentHoldings += +item.quantity
    }
  })

  return (
    <>
      <h1>Sell {slug}</h1>
      <p>Market Order</p>
      <p>1 {slug} = {companyData?.close} {companyData?.currency}</p>
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
      {userCurrentHoldings ? <button>Buy {slug}</button> : <p>You have no shares to sell</p>}
    </>
  )
}

export default Sell