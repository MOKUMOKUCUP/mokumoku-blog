/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  experimental: {
    appDir: false,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;

// next.config.js
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  images: {
    domains: ["s3.us-west-2.amazonaws.com"],
  },
});
