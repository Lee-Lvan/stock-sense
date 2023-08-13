// 'use client';
// import React from 'react';
// import axios from 'axios';
// import { useSession, signOut } from 'next-auth/react';


// const Signout = () => {
//   const { data: session } = useSession();

//   if (session) {
//     (async () => {
//       await axios.get(`/api/users?query=${session?.user?.email}`);
//     })()
//   }

//   return (
//     <>
//       {session && (
//         <>
//           <button className="signout-btn"  onClick={() => signOut()}>Sign out</button>
//           <p className='welcome-text'>Welcome {session.user?.email}</p>
//         </>
//       )}
//     </>
//   );
// };

// export default Signout;
