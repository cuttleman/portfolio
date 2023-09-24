const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "src/common/styles")],
  },
  env: {
    ENV: process.env.ENV,
    NODEMAILER_USER_EMAIL: process.env.NODEMAILER_USER_EMAIL,
    NODEMAILER_USER_PASSWORD: process.env.NODEMAILER_USER_PASSWORD,
  },
};

module.exports = nextConfig;
