/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 3600,
    remotePatterns: [
      {protocol: 'https', hostname: '**'},
      {protocol: 'http', hostname: '**'},
    ],
  },
  reactStrictMode: false,
  output: 'standalone',
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  async headers() {
    return [
      {
        source: '/layout',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // Cache trong 1 năm
          },
        ],
      },
      {
        source: '/homepage/banner',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // Cache trong 1 năm
          },
        ],
      },
    ]
  },
}

export default nextConfig
