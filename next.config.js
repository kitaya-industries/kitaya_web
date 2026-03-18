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
    value: 'camera=(), microphone=(), geolocation=(), payment=(self "https://checkout.razorpay.com")',
  },
  // Forces HTTPS
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // Content Security Policy — explicitly allows Razorpay scripts, frames and API calls
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // Scripts — self + Razorpay checkout + Google Fonts
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.razorpay.com https://api.razorpay.com",
      // Styles — self + Google Fonts
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Fonts — self + Google Fonts
      "font-src 'self' https://fonts.gstatic.com",
      // Images — self + Supabase storage + data URIs
      "img-src 'self' data: blob: https://*.supabase.co https://cdn.razorpay.com",
      // Frames — Razorpay opens in an iframe
      "frame-src 'self' https://api.razorpay.com https://checkout.razorpay.com",
      // API calls — self + Razorpay + Supabase + Delhivery
      "connect-src 'self' https://*.supabase.co https://api.razorpay.com https://checkout.razorpay.com https://lumberjack.razorpay.com https://track.delhivery.com",
      // Workers — Razorpay uses service workers
      "worker-src 'self' blob:",
    ].join('; '),
  },
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