'use client';
import React from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Signin = () => {
  return (
    <div className="signin-layout">
        <Link href={`/`}> 
        <FontAwesomeIcon icon={faArrowLeft} className="back-btn"/>
        </Link>
      <h1 className="logo">StockSense</h1>
      <p className="signin-subtitle">Sign In</p>
      <button className="auth-btn" onClick={() => signIn('github', { callbackUrl: '/' })}>
        With Github
      </button>
      <button className="auth-btn" onClick={() => signIn('google', { callbackUrl: '/' })}>
        With Google
      </button>
      {/* <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={emailRef}/>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={passwordRef}/>
          <button type='submit'>Sign up</button>
        </form> */}
    </div>
  );
};

export default Signin;
