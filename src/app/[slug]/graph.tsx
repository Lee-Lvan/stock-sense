'use client';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { ValuesT } from '../types/Symbol.type';
import { IWatchlistData } from '../types/Symbol.type';
// import dayjs from 'dayjs';

type ApexChartProps = {
  values: ValuesT[];
  companyData: IWatchlistData;
};

const ApexChart: React.FC<ApexChartProps> = ({ values, companyData }) => {
  console.log(companyData);
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
    title: {
      text: `${companyData.symbol} - ${companyData.name}`,
      align: 'center',
    },
    // annotations: {
    //   xaxis: [
    //     {
    //       x: 'Oct 06 14:00',
    //       borderColor: '#00E396',
    //       label: {
    //         borderColor: '#00E396',
    //         style: {
    //           fontSize: '12px',
    //           color: '#fff',
    //           background: '#00E396',
    //         },
    //         orientation: 'horizontal',
    //         offsetY: 7,
    //         text: 'Annotation Test',
    //       },
    //     },
    //   ],
    // },
    // tooltip: {
    //   enabled: true,
    // },
    // xaxis: {
    //   type: 'category',
    //   labels: {
    //       formatter: function(val) {
    //           return dayjs(val).format('MMM DD HH:mm')
    //       }
    //   }
    //   },
    //   yaxis: {
    //     tooltip: {
    //       enabled: true,
    //     },
    //   },
  };

  return (
    <>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={options.series}
          type="candlestick"
          height={600}
          length={100}
        />
      </div>
      <div>
        <ul>
          <li>Currency - {companyData.currency}</li>
          <li>Exchange - {companyData.exchange}</li>
          <li>Volume - {companyData.volume}</li>
          <li>% change - {companyData.change}%</li>
          <li>52 week low - {companyData.fifty_two_week.low}</li>
          <li>52 week high - {companyData.fifty_two_week.high}</li>
        </ul>
      </div>
    </>
  );
};

export default ApexChart;
