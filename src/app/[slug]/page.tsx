import React from 'react';
import { getGraphData } from '@/app/utils/twelvedata';
import { ValuesT } from '../types/Symbol.type';
import { getWatchlistData } from '@/app/utils/twelvedata';
import ApexChart from './graph';

const Symbol = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const data = await getGraphData(slug);
  const values = data.values;
  // console.log(data.meta.symbol);
  const companyData = await getWatchlistData(data.meta.symbol);
  console.log(companyData);

  return (
    <>
      <ApexChart values={values} companyData={companyData} />
    </>
  );
};

export default Symbol;
