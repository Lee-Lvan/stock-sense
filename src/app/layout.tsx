import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { connectToMongo } from './utils/connectToMongo';
import NextAuthProviders from './utils/nextAuthProviders';
import './globals.css';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Stock Sense',
  description: 'Created by Lee and Lvan',
};

connectToMongo();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProviders>
        {children}
        </NextAuthProviders>
      </body>
    </html>
  );
}
