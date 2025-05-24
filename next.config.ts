// next.config.ts - Fixed version with proper TypeScript types
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Your existing configuration
  experimental: {
    // Add any experimental features you need
  },
  
  // Configure webpack for Three.js and 3D models
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    // Handle GLB/GLTF files
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/models/',
          outputPath: 'static/models/',
        },
      },
    })

    // Handle other 3D file formats if needed
    config.module.rules.push({
      test: /\.(obj|mtl|fbx)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/models/',
          outputPath: 'static/models/',
        },
      },
    })

    return config
  },
}

export default nextConfig

// Alternative approach using the older JavaScript format (next.config.js)
// If you prefer to stick with JavaScript instead of TypeScript:

/*
// next.config.js
/** @type {import('next').NextConfig} */
/*
const nextConfig = {
  experimental: {
    // Add any experimental features you need
  },
  
  webpack: (config, { isServer }) => {
    // Handle GLB/GLTF files
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/models/',
          outputPath: 'static/models/',
        },
      },
    })

    // Handle other 3D file formats if needed
    config.module.rules.push({
      test: /\.(obj|mtl|fbx)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/models/',
          outputPath: 'static/models/',
        },
      },
    })

    return config
  },
}

module.exports = nextConfig
*/