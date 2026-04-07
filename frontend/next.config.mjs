/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    domains: ["appeallettergenerator.com"],
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/tool", destination: "/generate", permanent: true },
      { source: "/appeals", destination: "/generate", permanent: true },
      { source: "/appeal-letter", destination: "/generate", permanent: true },
      // WWW to non-WWW redirect
      {
        source: "/:path*",
        destination: "https://appeallettergenerator.com/:path*",
        has: [{ type: "host", value: "www.appeallettergenerator.com" }],
        permanent: true,
      },
    ];
  },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
