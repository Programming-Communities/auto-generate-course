/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'ik.imagekit.io',
        },
      ],
      // Optional: Add more image optimization settings
      deviceSizes: [320, 420, 768, 1024, 1200], // Default device sizes
      imageSizes: [16, 32, 48, 64, 96], // Default image sizes
      formats: ['image/webp'], // Serve images in WebP format for better performance
      minimumCacheTTL: 60, // Minimum cache TTL in seconds
    },
    // Enable source maps in production for debugging
    productionBrowserSourceMaps: true,
    // Optional: Add logging for debugging
    logging: {
      fetches: {
        fullUrl: true,
      },
    },
    // Optional: Configure static file caching
    headers: async () => {
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images:{
//         remotePatterns: [
//             {
//                 protocol: 'https',
//                 hostname: 'ik.imagekit.io',
//             }
//         ]
//     }
// };

// export default nextConfig;
