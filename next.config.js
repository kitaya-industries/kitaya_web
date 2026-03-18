/** @type {import('next').NextConfig} */

const securityHeaders = [
  // Prevents clickjacking — stops your site being loaded in an iframe on another domain
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  // Stops browsers guessing content types — prevents MIME-sniffing attacks
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Controls how much referrer info is sent when navigating away
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // Disables browser features your site doesn't use
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(self "https://checkout.razorpay.com")',
  },
  // Tells browsers to always use HTTPS (enable once your domain is live on SSL)
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
];

const supabaseHostname =
  process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('https://', '') ||
  'zioldrcmklrcdsohvmgy.supabase.co';

const nextConfig = {
  async headers() {
    return [
      {
        // Apply security headers to every route
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