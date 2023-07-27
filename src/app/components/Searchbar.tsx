// 'use client';
// import React, { useState } from 'react';
// import { IStock } from '../interfaces/IStock';
// import Link from 'next/link';

// const Searchbar = () => {
//   const [results, setResults] = useState<IStock[]>([]);

//   const handleSetQuery = async (query: string) => {
//     const response = await fetch(`/api/symbols?query=${query}`);
//     const symbols = await response.json();
//     setResults(symbols);
//   };
//   return (
//     <div className='searchbar'>
//       <input
//         onChange={e => handleSetQuery(e.target.value)}
//         type="text"
//         name="searchbar"
//         id="searchbar"
//         placeholder="Search for a stock"
//       />
//       {results && (
//         <ul>
//           {results.reverse().map((item: IStock) => (
//             <li key={item._id}>
//               <Link href={`/${item.symbol}`}>
//                 {item.symbol} - {item.name} - {item.exchange}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Searchbar;
