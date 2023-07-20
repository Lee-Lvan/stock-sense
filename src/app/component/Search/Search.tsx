'use client';
import React from 'react';
import { getSearchRes } from '@/app/utils/twelvedata';
import { ISearchRes } from '@/app/types/Symbol.type';
import Link from 'next/link';


const Search = () => {
  const [searchRes, setSearchRes] = React.useState<ISearchRes[]>([]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const res = await getSearchRes(e.target.value);
    const results = res.data;
    setSearchRes(results);
    // console.log(res);
    // console.log(results);
  }
  // console.log(searchRes);

  return (
  <>
  <input 
    type="text" 
    placeholder="Enter symbol to search" 
    onChange={handleSearch} />
  <ul>
    {searchRes.length !== 0 && 
      (searchRes.map(item => (
      (<li key={item._id}>
        <Link href={`/${item.symbol}`}>{item.symbol} - {item.instrument_name} - {item.exchange}</Link>
        </li>)
      )))}
  </ul>
  </>
  )
};

export default Search;
