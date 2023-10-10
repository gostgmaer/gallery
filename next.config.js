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
    }, sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    },
  };
  
  module.exports = nextConfig;
  