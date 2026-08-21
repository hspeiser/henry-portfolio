/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  redirects: async () => [
    {
      source: "/projects/robot-electronics",
      destination: "/projects/frc-971",
      permanent: true,
    },
  ],
  webpack: (config) => {
    // Fix pdfjs-dist ESM compatibility with webpack
    config.resolve.alias.canvas = false
    config.resolve.alias.encoding = false
    return config
  },
}

export default nextConfig
