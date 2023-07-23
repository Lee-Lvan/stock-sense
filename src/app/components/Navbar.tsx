'use client'
import React from 'react'
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav>
      <ul>
        <li>TRADE</li>
        <li>StockSense</li>
        <li>LEARN</li>
        {!session &&<li><Link href={'/signin'}>Log in/sign up</Link></li>}
        {session && <li onClick={() => signOut()}>Sign out</li>}
      </ul>
    </nav>
  )
}

export default Navbar