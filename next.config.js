/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'cdn.moveek.com',
            port: '',
            pathname: '/storage/media/cache/**',
          },
          {
            protocol: 'https',
            hostname: 'cdn.moveek.com',
            port: '',
            pathname: '/bundles/ornweb/img/**',
          },
          {
            protocol: 'http',
            hostname: 'movieapi.cyberlearn.vn',
            port: '',
            pathname: '/hinhanh/**',
          },
          {
            protocol: 'https',
            hostname: 's3img.vcdn.vn',
            port: '',
            pathname: '/**',
          },
        ],
       
      },
      experimental: {
        serverActions: true,
      },
    
}

module.exports = nextConfig
