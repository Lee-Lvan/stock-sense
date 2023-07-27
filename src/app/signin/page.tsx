'use client';
import React from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';

const Signin = () => {
  return (
    <div className="signin-layout">
      <Link href={`/`}>
        <FontAwesomeIcon icon={faArrowLeft} className="back-btn" />
      </Link>
      <h1 className="logo">StockSense</h1>
      <p className="signin-subtitle">Sign In</p>
      <button className="auth-btn" onClick={() => signIn('github', { callbackUrl: '/' })}>
        <FontAwesomeIcon icon={faGithub} /> &nbsp; Github
      </button>
      <button className="auth-btn" onClick={() => signIn('google', { callbackUrl: '/' })}>
        <FontAwesomeIcon icon={faGoogle} /> &nbsp; Google
      </button>
    </div>
  );
};

export default Signin;
