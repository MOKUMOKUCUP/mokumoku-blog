/**
 * @type {import('next').NextConfig}
 */

// next.config.js
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  images: {
    domains: ["prod-files-secure.s3.us-west-2.amazonaws.com"],
  },
});
