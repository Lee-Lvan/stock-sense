'use client';
import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
// import Signout from './Signout';
import axios from 'axios';

const Navbar = () => {
  const { data: session } = useSession();
  // const { data: session } = useSession();

  if (session) {
    (async () => {
      await axios.get(`/api/users?query=${session?.user?.email}`);
    })();
  }

  return (
    <nav>
      <div className="header">
      <button className="mode-btn">Trade</button>
      {/* <button>Learn</button> Need to figure out how to do this toggle */}
      <h1 className="logo">StockSense</h1>
      {!session && (
        <button className="signin-btn">
          <Link href={'/signin'}>Sign In</Link>
        </button>
      )}
      {session && (
          <button className="signout-btn" onClick={() => signOut()}>
            Sign out
          </button>
      )}
      </div>
      {session && (<p className="welcome-text">Welcome {session.user?.email}</p>)}
      {/* {session && (
        <button className="signout-btn" onClick={() => signOut()}>
          Sign out
        </button>
      )} */}
      {/* <Signout /> */}
    </nav>
  );
};

export default Navbar;
