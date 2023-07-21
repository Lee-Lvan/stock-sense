import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL,
  // database: {
  //   type: 'mongodb',
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   url: process.env.DATABASE_URL,
  // },
});

export { handler as GET, handler as POST };