/** @type {import('next').NextConfig} */

const withImages = require('next-images');
module.exports = Object.assign(withImages(), {
  reactStrictMode: true,
  images: {
    domains: ['starwars-visualguide.com']
  }
});
