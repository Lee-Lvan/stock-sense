'use client';
import React, { useEffect } from 'react';
import axios from 'axios';
import { useSession, signOut } from 'next-auth/react';


const Signout = () => {
  const { data: session } = useSession();
  console.log(session);

  const handleSignin = async () => {
    const response = await axios.get(`/api/users?query=${session?.user?.email}`);
    const result = await response.data;
    console.log(result);
  };

  useEffect(() => {
    handleSignin();
  }, [session]);

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
