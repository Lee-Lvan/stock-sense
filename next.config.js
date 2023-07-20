/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
},
  env: {
    // DB_URI: ,
    // NEXTAUTH_SECRET: ,

    GITHUB_ID: 'fa2c2086e7721fd870a1',
    GITHUB_SECRE: 'fc2de468527bb7abe26f7a08aed7dfacfd1c5e78',

    GOOGLE_ID:'744014055280-dn269s9vs10u5ufqv9j5um5vfpfcu6sp.apps.googleusercontent.com',
    GOOGLE_SECRET:'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',
  },
};

module.exports = nextConfig;
