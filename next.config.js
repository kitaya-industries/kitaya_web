/** @type {import('next').NextConfig} */

const securityHeaders = [
  // Prevents clickjacking
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  // Stops MIME-sniffing attacks
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Controls referrer info
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // Disables browser features — allows Razorpay payment
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  // Forces HTTPS
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // NOTE: CSP removed for now — Razorpay loads many dynamic scripts from
  // multiple subdomains that are difficult to whitelist completely.
  // The other 4 headers above still provide solid protection.
  // Add a CSP back once you confirm all payment flows work end-to-end.
];

const supabaseHostname =
  process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('https://', '') ||
  'zioldrcmklrcdsohvmgy.supabase.co';

const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: supabaseHostname,
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

module.exports = nextConfig;