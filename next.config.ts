import type { NextConfig } from "next";

// Marketing pages removed for the dark-tech rebuild (see docs/PAGE-INVENTORY.md).
// Temporary redirects to the homepage; drop a route from this list when its page comes back.
const REMOVED_ROUTES = [
  '/ai-toolkit', '/build', '/builders', '/business-brain', '/cart',
  '/contact', '/ecosystem', '/enterprise', '/free/toolkit', '/industries', '/interactive',
  '/lab', '/lab/:path*', '/learn', '/pricing', '/rescue', '/sitemap', '/store',
  '/teams', '/preview',
]

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      { source: '/work', destination: '/', permanent: false },
      ...REMOVED_ROUTES.map((source) => ({ source, destination: '/', permanent: false })),
    ]
  },
};

export default nextConfig;
