'use client';
import React from 'react';

const Footer = () => {
  return (
    <footer>
      <p className="mark">
        Design & Developed by{' '}
        <a href="https://www.linkedin.com/in/leesheppard244/" className="linkedin">
          Lee Sheppard
        </a>{' '}
        and{' '}
        <a href="https://www.linkedin.com/in/lvan-ni/" className="linkedin">
          Lvan Ni
        </a>
      </p>
      <p className="stack">Powered by Next.js, MongoDB, TwelveData, ApexChart</p>
      <br />
      <p className="copyright">© 2023 StockSense Inc.</p>
    </footer>
  );
};

export default Footer;
