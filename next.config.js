const path = require('path')
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        "source.unsplash.com",
        "avatars.githubusercontent.com",
        "dev-portfolio-mayankagarwal09.vercel.app",
        "s3.amazonaws.com",
        "firebasestorage.googleapis.com",
        "images.unsplash.com"
      ],
    },
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    },
    // Transpile packages to avoid parse errors with modern ESM syntax
    transpilePackages: ['undici', '@firebase/storage', 'firebase'],
    webpack: (config, { isServer }) => {
      // Allow .mjs files to be parsed correctly
      config.module.rules.push({
        test: /\.m?js/,
        resolve: { fullySpecified: false },
      });
      return config;
    },
  };

  module.exports = nextConfig;
  