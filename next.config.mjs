/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mqzozdulyfyjqevmston.supabase.co',
      },
    ],
  },
};

export default nextConfig;
