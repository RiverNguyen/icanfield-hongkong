const nextConfig = {
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 3600,
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
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
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/homepage/banner',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },

  // ✅ Tối ưu Webpack để giảm Evaluate Script
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.devtool = 'cheap-module-source-map'; // Tăng tốc độ build & debug
    } else {
      config.devtool = false; // Không cần source map trong production
    }

    // ✅ Giảm kích thước bundle JS
    config.optimization.splitChunks = {
      chunks: 'all',
      minSize: 30 * 1024, // 30KB
      maxSize: 250 * 1024, // 250KB
    };

    // ✅ Nếu đang build server, không bundle những module nặng không cần thiết
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push('lodash', 'moment'); // Nếu đang dùng lodash/moment.js thì bỏ ra ngoài
    }

    return config;
  },
};

export default nextConfig;