import React from 'react';
import { getGraphData } from '@/app/utils/twelvedata';
import { ValuesT } from '../types/Symbol.type';

const Symbol = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const data = await getGraphData(slug);
  const values = data.values;
  console.log(data);

  return (
    <>
      <h1>{data.meta.symbol}</h1>

      {values.map((item: ValuesT) => {
        return (
          <>
            <p>timestamp: {item.datetime}</p>
            <p>open: {item.open}</p>
            <p>high: {item.high}</p>
            <p>low: {item.low}</p>
            <p>close: {item.close}</p>
            <hr />
          </>
        );
      })}
    </>
  );
};

export default Symbol;


