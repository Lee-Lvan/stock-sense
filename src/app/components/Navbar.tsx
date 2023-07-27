'use client';
import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import axios from 'axios';

const Navbar = () => {
  const { data: session } = useSession();
  const [trade, setTrade] = useState(true);

  if (session) {
    (async () => {
      await axios.get(`/api/users?query=${session?.user?.email}`);
    })();
  }

  return (
    <nav>
      <div className="header">
        <h1 className="logo">StockSense</h1>
        <div className="btn-layout">
          {session &&
            (trade ? (
              <button onClick={() => setTrade(!trade)} className="mode-btn">
                Trade
              </button>
            ) : (
              <button onClick={() => setTrade(!trade)} className="mode-btn">
                Learn
              </button>
            ))}
          {!session && (
            <Link href={'/signin'}>
              <button className="signin-btn">Sign In</button>
            </Link>
          )}
          {session && (
            <button className="signout-btn" onClick={() => signOut()}>
              Sign out
            </button>
          )}
        </div>
      </div>
      {session && <p className="welcome-text">Welcome  {session.user?.email} !</p>}
    </nav>
  );
};

export default Navbar;
