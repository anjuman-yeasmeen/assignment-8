/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'json.shahriyar.dev',
      },
      {
        protocol: 'https',
        hostname: 'stjamesquarter.com',
      },
    ],
  },
};

export default nextConfig;