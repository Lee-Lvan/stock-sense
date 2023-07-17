import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { MongoClient } from 'mongodb';

const inter = Inter({ subsets: ['latin'] });
const uri = process.env.MONGO_URI as string;
console.log(uri);

export const metadata: Metadata = {
  title: 'Stock Sense',
  description: 'Created by Lee and Lvan',
};

(async () => {
  const client = new MongoClient(uri);
  await client.connect();
  const userCollection = client.db('stock-sense').collection('users');
  const watchlistCollection = client
    .db('stock-sense')
    .collection('watchlist-items');
  const data = await userCollection.findOne({});
  // console.log(data);
})();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
