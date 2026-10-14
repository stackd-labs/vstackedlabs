import type { NextConfig } from "next";

// Marketing pages removed for the dark-tech rebuild (see docs/PAGE-INVENTORY.md).
// Temporary redirects to the homepage; drop a route from this list when its page comes back.
const REMOVED_ROUTES = [
  '/ai-toolkit', '/build', '/builders', '/business-brain', '/cart',
  '/contact', '/ecosystem', '/enterprise', '/free/toolkit', '/industries', '/interactive',
  '/lab', '/lab/:path*', '/learn', '/pricing', '/rescue', '/sitemap', '/store',
  '/teams', '/preview', '/admin', '/admin/:path*',
]

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  // The gated launch guide PDF is read from private/ at request time; ship it with that route.
  outputFileTracingIncludes: {
    '/api/launch-guide': ['./private/launch-guide.pdf'],
  },
  async redirects() {
    return [
      { source: '/work', destination: '/', permanent: false },
      // The guide used to be a public file; it is gated behind the signup form now.
      { source: '/Stackd-Before-You-Launch-Checklist.pdf', destination: '/#launch-guide', permanent: false },
      ...REMOVED_ROUTES.map((source) => ({ source, destination: '/', permanent: false })),
    ]
  },
};

export default nextConfig;
