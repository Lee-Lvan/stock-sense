'use client';
import React, { useRef } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

const Signup = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const data = await signIn('credentials', {
        redirect: false,
        email: emailRef.current?.value as string,
        password: passwordRef.current?.value as string,
      });
      // console.log(data);
    } catch (error) {
      console.log(error);
    };
  };

  return (
        <>
        <h1>StockSense</h1>
        <h3>Sign up</h3>
        <p>Already have an account?</p>
        <Link href={'/login'}>Log in</Link>
        <button onClick={() => signIn('github')}>Github</button>
        <button onClick={() => signIn('google')}>Google</button>
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

export default Signup;
