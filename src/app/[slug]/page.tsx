'use client';
import React, { useEffect, useState } from 'react';
import { getGraphData } from '@/app/utils/twelvedata';
import { getWatchlistData } from '@/app/utils/twelvedata';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { ValuesT } from '../types/Symbol.type';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Loader from '../components/Loader';
import { CompanyData } from '../types/CompanyData.type';

const Symbol = ({ params }: { params: { slug: string } }) => {
  const { data: session } = useSession();
  const { slug } = params;
  const [values, setValues] = useState([]);
  const [companyData, setCompanyData] = useState<CompanyData | null>();
  const [timeframe, setTimeframe] = useState([slug, '5min', '78']);

  useEffect(() => {
    const fetchChartData = async () => {
      const data = await getGraphData(timeframe);
      const chartValues = data.values;
      const companyDataResponse = await getWatchlistData(data.meta.symbol);
      setValues(chartValues);
      setCompanyData(companyDataResponse);
    };
    fetchChartData();
  }, [timeframe]);

  const options: ApexOptions = {
    series: [
      {
        name: 'candlestick',
        data: values.reverse().map((item: ValuesT) => {
          return {
            x: item.datetime,
            y: [item.open, item.high, item.low, item.close],
          };
        }),
      },
    ],
    tooltip: {
      theme: 'dark',
    },
    xaxis: {
      type: 'numeric',
      labels: {
        show: false,
      },
    },
    chart: {
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
    <section className="single-stock__layout">
      <span className="back-btn__containter">
        <Link href={`/`}>
          <FontAwesomeIcon icon={faArrowLeft} className="back-btn" />
        </Link>
      </span>
      {!companyData && <Loader />}
      {companyData && (
        <>
          <article className="single-stock__header-layout">
            <div className="single-stock__header">
              <p className="single-stock__header-symbol">
                {companyData.symbol}
              </p>
              <p className="single-stock__header-name">{companyData.name}</p>
              <p className="single-stock__header-exchange">
                {companyData.exchange}
              </p>
            </div>
            <div className="single-stock__header-market">
              {companyData.is_market_open ? (
                <p className="market-open">Market Open</p>
              ) : (
                <p className="market-closed">Market Closed</p>
              )}
            </div>
          </article>
          <article className="single-stock__price-layout">
            <div className="single-stock__price">
              {companyData.close} {companyData.currency}
            </div>
            <div className="single-stock__price-change">
              {+companyData.change < 0 ? (
                <div className="single-stock__price-red">
                  {companyData.change} {companyData.currency} (
                  {companyData.percent_change} %)
                </div>
              ) : (
                <div className="single-stock__price-green">
                  {companyData.change} {companyData.currency} (
                  {companyData.percent_change}%)
                </div>
              )}
            </div>
          </article>
          <article className="single-stock__period-layout">
            <button
              className="single-stock__period-btn"
              onClick={() => setTimeframe([companyData.symbol, '5min', '78'])}
            >
              1D
            </button>
            <span className="separator">|</span>
            <button
              className="single-stock__period-btn"
              onClick={() => setTimeframe([companyData.symbol, '30min', '65'])}
            >
              1W
            </button>
            <span className="separator">|</span>
            <button
              className="single-stock__period-btn"
              onClick={() => setTimeframe([companyData.symbol, '4h', '60'])}
            >
              1M
            </button>
            <span className="separator">|</span>
            <button
              className="single-stock__period-btn"
              onClick={() => setTimeframe([companyData.symbol, '1day', '90'])}
            >
              3M
            </button>
            <span className="separator">|</span>
            <button
              className="single-stock__period-btn"
              onClick={() => setTimeframe([companyData.symbol, '1day', '365'])}
            >
              1Y
            </button>
          </article>
          <article id="chart" className="single-stock__chart">
            <ReactApexChart
              options={options}
              series={options.series}
              type="candlestick"
              height={350}
            />
          </article>
          <article className="single-stock__trade-layout">
            {session && (
              <Link href={`/${companyData.symbol}/sell`}>
                <button className="single-stock__trade-btn">Sell</button>
              </Link>
            )}
            {session && (
              <Link href={`/${companyData.symbol}/buy`}>
                <button className="single-stock__trade-btn">Buy</button>
              </Link>
            )}
          </article>
          <article className="single-stock__meta-layout">
            <div className="single-stock__meta">
              <p className="single-stock__meta-metric">Volume</p>
              <p className="single-stock__meta-data">{companyData.volume}</p>
            </div>
            <div className="single-stock__meta">
              <p className="single-stock__meta-metric">Change</p>
              <p className="single-stock__meta-data">{companyData.change}%</p>
            </div>
            <div className="single-stock__meta">
              <p className="single-stock__meta-metric">High (24-hour)</p>
              <p className="single-stock__meta-data">
                {companyData.fifty_two_week.high}
              </p>
            </div>
            <div className="single-stock__meta">
              <p className="single-stock__meta-metric">Low (24-hour)</p>
              <p className="single-stock__meta-data">
                {companyData.fifty_two_week.low}
              </p>
            </div>
          </article>
        </>
      )}
    </section>
  );
};

export default Symbol;
