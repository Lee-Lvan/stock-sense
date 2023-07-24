'use client'
import React, { useEffect, useState } from 'react';
import { getGraphData } from '@/app/utils/twelvedata';
import { getWatchlistData } from '@/app/utils/twelvedata';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { ValuesT } from '../types/Symbol.type';
import { IWatchlistData } from '../types/Symbol.type';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import symbolData from '../checkout';

const Symbol = ({ params }: { params: { slug: string } }) => {
  const {data: session} = useSession()
  const { slug } = params;
  const [values, setValues] = useState([]);
  const [companyData, setCompanyData] = useState();
  const [timeframe, setTimeframe] = useState([slug, '5min', '78']);

  useEffect(() => {
    const fetchChartData = async () => {
      const data = await getGraphData(timeframe);
      const chartValues = data.values;
      console.log('------',data.meta.symbol)
      const companyDataResponse = await getWatchlistData(data.meta.symbol);
      setValues(chartValues);
      setCompanyData(companyDataResponse);
    }
    fetchChartData();
  }, [timeframe])



  const options: ApexOptions = {
    series: [
      {
        name: 'candle',
        data: values.reverse().map((item: ValuesT) => {
          return {
            x: item.datetime,
            y: [item.open, item.high, item.low, item.close],
          };
        }),
      },
    ],
    chart: {
      height: 350,
      type: 'candlestick',
      toolbar: {
        show: false,
      },
      animations: {
        speed: 200,
      },
    },
  };

  
  
  return (
    <>
      <p>{companyData?.symbol} - {companyData?.name} - {companyData?.exchange} - {companyData?.close} {companyData?.currency}</p>
      {companyData?.is_market_open ? <h3>Market Open</h3> : <h3>Market Closed</h3>}
      <button onClick={() => setTimeframe([companyData?.symbol, '5min', '78'])}>1D</button>
      <button onClick={() => setTimeframe([companyData?.symbol, '30min', '65'])}>1W</button>
      <button onClick={() => setTimeframe([companyData?.symbol, '4h', '60'])}>1M</button>
      <button onClick={() => setTimeframe([companyData?.symbol, '1day', '90'])}>3M</button>
      <button onClick={() => setTimeframe([companyData?.symbol, '1day', '365'])}>1Y</button>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={options.series}
          type="candlestick"
          height={600}
          length={100}
        />
      </div>
      {session && <Link  href={`/${companyData?.symbol}/sell`}>Sell</Link>}
      {session && <Link href={`/${companyData?.symbol}/buy`}>Buy</Link>}
      <div>
        <ul>
          <li>Volume: {companyData?.volume}</li>
          <li>% change: {companyData?.change}%</li>
          <li>52 week low: {companyData?.fifty_two_week.low}</li>
          <li>52 week high: {companyData?.fifty_two_week.high}</li>
        </ul>
      </div>
    </>
  );
};

export default Symbol;
