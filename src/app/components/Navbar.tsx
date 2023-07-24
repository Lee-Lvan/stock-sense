'use client'
import React from 'react'
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav>
      {/* <div className='nav'> */}
        <button className='mode-btn'>Trade</button>
        {/* <button>Learn</button> Need to figure out how to do this toggle */}
        <h1 className='logo'>StockSense</h1>
        {!session &&<button className='signin-btn'><Link href={'/signin'}>Sign In</Link></button>}
        {session && <button className='signout-btn'onClick={() => signOut()}>Sign out</button>}
      {/* </div> */}
    </nav>
  )
}

export default Navbar;