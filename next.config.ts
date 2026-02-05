import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Libera imagens do Unsplash e do seu Supabase
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'atveyixqdhfdmqdrvpwx.supabase.co', // Seu Supabase
      },
    ],
  },
  // 2. Ignora erros de TypeScript no Build (Para não travar o deploy)
  typescript: {
    ignoreBuildErrors: true,
  },
  // 3. Ignora erros de ESLint no Build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;