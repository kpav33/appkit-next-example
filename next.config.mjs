/** @type {import('next').NextConfig} */
// const nextConfig = {};
// Next.js relies on SSR so we need to add this code here to make Web3Modal work properly
const nextConfig = {
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

export default nextConfig;
