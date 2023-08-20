/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  env: {
    GITHUB_ID: process.env.NEXT_PUBLIC_GITHUB_ID,
    GITHUB_SECRET: process.env.NEXT_PUBLIC_GITHUB_SECRET,

    GOOGLE_ID: process.env.NEXT_PUBLIC_GOOGLE_ID,
    GOOGLE_SECRET: process.env.NEXT_PUBLIC_GOOGLE_SECRET,

    API_KEY: process.env.NEXT_PUBLIC_API_KEY,
  },
};

module.exports = nextConfig;
