'use client';
import React, { useRef } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';

const Signin = () => {
  

  return (
        <>
        <h1>StockSense</h1>
        

        <button onClick={() => signIn('github', {callbackUrl: '/'})}>Continue with Github</button> <br />
        <button onClick={() => signIn('google', {callbackUrl: '/'})}>Continue with Google</button>
        <hr />
        {/* <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={emailRef}/>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={passwordRef}/>
          <button type='submit'>Sign up</button>
        </form> */}
        </>
  );
};

export default Signin;
