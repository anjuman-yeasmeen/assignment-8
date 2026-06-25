/** @type {import('next').NextConfig} */
const nextConfig = {
  // mongodb একটি নেটিভ Node প্যাকেজ — এটিকে সার্ভার-এক্সটার্নাল রাখা হয় যাতে
  // Turbopack প্রোডাকশন বিল্ডে এটি বান্ডল করার চেষ্টা না করে ("Can't resolve 'mongodb'" এড়াতে)।
  serverExternalPackages: ["mongodb"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "json.shahriyar.dev",
      },
      {
        protocol: "https",
        hostname: "stjamesquarter.com",
      },
    ],
  },
};

export default nextConfig;
