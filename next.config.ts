import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'atveyixqdhfdmqdrvpwx.supabase.co', // Este é o SEU endereço do Supabase
      },
    ],
  },
};

export default nextConfig;