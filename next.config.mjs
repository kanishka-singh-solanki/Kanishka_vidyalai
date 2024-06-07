/** @type {import('next').NextConfig} */
// Task 4
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'via.placeholder.com',
          port: '',
          pathname: '/150/**',
        },
      ],
    },
  };
// Task 4

export default nextConfig;
