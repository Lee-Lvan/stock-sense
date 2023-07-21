'use client';
import React from 'react'
import { useSession, signOut } from 'next-auth/react'

const Signout = () => {
  const { data: session } = useSession();
  console.log(session);

  return (
      <>
      {session && (
        <>
        <p>Signed in as {session.user?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
      </>
  )
}

export default Signout