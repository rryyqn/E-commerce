/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "static.wixstatic.com" },
      { protocol: "https", hostname: "www.paypalobjects.com" },
      { protocol: "https", hostname: "cdn.visa.com" },
      { protocol: "https", hostname: "www.mastercard.com" },
    ],
  },
};

export default nextConfig;
