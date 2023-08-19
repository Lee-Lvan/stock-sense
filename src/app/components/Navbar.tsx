'use client';
import React, { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import axios from 'axios';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const { data: session } = useSession();
  const [trade, setTrade] = useState(true);

  if (session) {
    (async () => {
      await axios.get(`/api/users?query=${session?.user?.email}`);
    })();
  }

  const pathname = usePathname();
  useEffect(() => {
    if (pathname === '/learn') {
      setTrade(false);
    }
  }, [pathname]);

  return (
    <nav>
      <div className="header">
        <h1 className="logo">StockSense</h1>
        <div className="btn-layout">
          {session &&
            (trade ? (
              <Link href={'/learn'}>
                <button onClick={() => setTrade(!trade)} className="mode-btn">
                  Learn
                </button>
              </Link>
            ) : (
              <Link href={'/'}>
                <button onClick={() => setTrade(!trade)} className="mode-btn">
                  Trade
                </button>
              </Link>
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
      {session && (
        <p className="welcome-text">Welcome {session.user?.email} !</p>
      )}
    </nav>
  );
};

export default Navbar;
