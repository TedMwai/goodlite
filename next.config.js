/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "https://d33wubrfki0l68.cloudfront.net/7c2dda6eab52a4b95dc6c3503d5a09c4e314f756/4d7a5/images/placeholders/square1.svg",
      "https://d33wubrfki0l68.cloudfront.net/6163c5a4083dab2763aa0f2aa9e6bded23630eb7/935d6/images/placeholders/square2.svg",
      "https://d33wubrfki0l68.cloudfront.net/ded521c426f480d4e473a11836c6ab8e7e948c84/95877/images/placeholders/square3.svg",
      "https://d33wubrfki0l68.cloudfront.net/07865c265551d7a67bdf88188ff62a07b84ffd6f/7e12f/images/placeholders/square4.svg",
      "res.cloudinary.com",
    ],
  },
}

module.exports = nextConfig
