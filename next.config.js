/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
},
  env: {
    // DB_URI: ,
    // NEXTAUTH_SECRET: ,

    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,

    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,

    API_KEY: process.env.API_KEY
  },
};

module.exports = nextConfig;
