/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: [],
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.d\.ts$/,
      use: 'ignore-loader'
    }),
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
      }
    return config
  }
}

module.exports = nextConfig
