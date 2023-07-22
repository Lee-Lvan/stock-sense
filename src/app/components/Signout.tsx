'use client';
import React, { useEffect } from 'react';
import axios from 'axios';
import { useSession, signOut } from 'next-auth/react';


const Signout = () => {
  const { data: session } = useSession();

  if (session) {
    (async () => {
      await axios.get(`/api/users?query=${session?.user?.email}`);
    })()
  }

  return (
    <>
      {session && (
        <>
          <p>Signed in as {session.user?.email}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </>
  );
};

export default Signout;
